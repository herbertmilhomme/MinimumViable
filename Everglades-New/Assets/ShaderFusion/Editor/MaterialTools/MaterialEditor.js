
class SFMaterialEditor extends EditorWindow {
var shaderGen:MaterialShaderGen;
var currentShaderPath:String;

var masterNode:MaterialNode_Master;
var nodes:Array;
var nodesWithoutMaster:Array;
var selectedNodes:Array;
var cameraOffset:Vector2;

var nodeSkin:GUISkin;

var socketTextStyle:GUIStyle;

var nodeStyle:GUIStyle;
var nodeBorderStyle:GUIStyle;
var nodeSelectedBorderStyle:GUIStyle;
var editorBackgroundStyle:GUIStyle;
var backgroundImage:Texture2D;
var borderImage:Texture2D;
var borderSelectedImage:Texture2D;
var editorBackgroundImage:Texture2D;
var lineTex:Texture2D;
var bgColor:Color;
var borderColor:Color;
var borderSelectedColor:Color;
var editorBackgroundColor:Color;

var draggingSocket:MaterialNodeSocket;
var draggingType:String = "";
var draggingStartPos:Vector2;

var nodeScrollPosition:Vector2;

var nodeTypes:Array;
var nodeTypeDummys:Array;
var lastNodeIndex:int = -1;

var inspectorRect:Rect;
var mousePosition:Vector2;
var started:boolean;
var showLogo:boolean;

var dragDownPos:Vector2;
var mouseDragDelta:Vector2;
var mouseDragging:int;

var lodValue:float = 600.0;
var fallbackName:String = "Transparent/Cutout/VertexLit";

var deferredCatTags:String;
var catTags:String;
var blendingName:String;
var litBlendingString:String;
var unlitBlendingString:String;
var deferredBlendingString:String;
var deferredParams:String;
var showBlendingDropdown:boolean;

var showSMDropdown:boolean;
var smString:String;

var zWriteString:String;
var deferredMode:boolean;

var showQuickStart:boolean;
var wasPlaying:boolean;

var lineWidth:float;
var lineColor:Color;
var isPro:boolean = false;
var hasSetPro:boolean = false;

var guiState:String = "";

var lastMousePos:Vector2;
var mouseWasMoved:boolean;

@MenuItem ("Window/ShaderFusion")
static function Init () {
	var theSelection:Array = Selection.objects;
	if (theSelection.length > 0 && theSelection[0] instanceof Shader) {
		var path:String = AssetDatabase.GetAssetPath(theSelection[0]);
		LoadShader(path);
	}
	else {
		LoadShader("");
	}
	//var materialEditorWindow:MaterialEditor = EditorWindow.GetWindow(MaterialEditor);
	//materialEditorWindow.Show();
}

static function LoadShader(inPath:String) {
	var path:String = ""+inPath;
	//try{
	var materialEditorWindow:SFMaterialEditor = EditorWindow.GetWindow(SFMaterialEditor, false, "Shader Fusion");
	materialEditorWindow.Close();
	materialEditorWindow = EditorWindow.GetWindow(SFMaterialEditor, false, "Shader Fusion");
	materialEditorWindow.Show();
	materialEditorWindow.currentShaderPath = path;
	materialEditorWindow.shaderGen.LoadNodeInfo();
	materialEditorWindow.UpdateHiddenInfoNodes();
	//}catch(err) {
	//	EditorUtility.DisplayDialog ("", "There was an error while loading!\n"+err, "Ok");
	//}
}

function CheckIfPro() {
	var src:Texture2D = Texture2D(2,2);
	src.SetPixel(0,0,Color(0,1,1,1));
	src.SetPixel(1,0,Color(0,1,1,1));
	src.SetPixel(1,1,Color(1,1,1,1));
	src.SetPixel(0,1,Color(0,1,1,1));
	src.Apply();
	var dst:RenderTexture = RenderTexture(2,2,24);
	dst.Create();
	var mat:Material = Material(Shader.Find("Hidden/ProCheckShader"));
	var outTex:Texture2D = Texture2D(2,2);
	outTex.SetPixel(0,0,Color(0,0,0,0));
	outTex.SetPixel(1,0,Color(0,0,0,0));
	outTex.SetPixel(0,1,Color(0,0,0,0));
	outTex.SetPixel(0,1,Color(0,0,0,0));
	outTex.Apply();
	RenderTexture.active = dst;
	try {
		Graphics.Blit(src,dst);
	}
	catch(err) {
		RenderTexture.active = null;
		isPro = false;
		return;
	}
	
	outTex.ReadPixels(Rect(0,0,2,2),0,0,false);
	outTex.Apply();
	Debug.Log(outTex.GetPixel(0,0));
	if (outTex.GetPixel(0,0) == Color(0,1,1,1)) {
		RenderTexture.active = null;
		isPro = true;
		return;
	}
	else {
		RenderTexture.active = null;
		isPro = false;
		return;
	}
}

function Awake () {
	//wantsMouseMove = true;
	//autoRepaintOnSceneChange = true;
	//CheckIfPro();
	if (SystemInfo.supportsRenderTextures) {
		isPro = true;
	}
	deferredMode = true;
	started = false;
	showLogo = true;
	showQuickStart = false;
	wasPlaying = Application.isPlaying;
	if (isPro) {
		bgColor = Color(0.3,0.3,0.3,1.0);
	}
	else {
		bgColor = Color(0.8,0.8,0.8,1.0);
	}
	borderColor = Color(0.0,0.0,0.0,1.0);
	borderSelectedColor = Color(7.0,0.2,0.1,1.0);
	editorBackgroundColor = Color(0.3,0.3,0.3,1.0);
	lineWidth = 1.25;
	lineColor = Color(0.05,0.05,0.05,0.95);

	cameraOffset = Vector2(position.width*1.5, position.height*0.5);
	
	shaderGen = new MaterialShaderGen(this);
	currentShaderPath = "";
	
	masterNode = new MaterialNode_Master();
	masterNode.Awake(this);
	//masterNode.position.x = position.width*2;
	//masterNode.position.y += position.height*0.5;
	nodes = new Array();
	selectedNodes = new Array();
	nodesWithoutMaster = new Array();
	
	nodes.Add(masterNode);
	
	socketTextStyle = GUIStyle();
	nodeStyle = GUIStyle();
	nodeBorderStyle = GUIStyle();
	nodeSelectedBorderStyle = GUIStyle();
	editorBackgroundStyle = GUIStyle();
	
	if (isPro) {
		nodeSkin = AssetDatabase.LoadAssetAtPath(
					"Assets/ShaderFusion/Editor/MaterialTools/GUISkins/NodeSkin.GUISkin", GUISkin);
		//Debug.Log("This Is Pro");
	}
	else {
		nodeSkin = AssetDatabase.LoadAssetAtPath(
					"Assets/ShaderFusion/Editor/MaterialTools/GUISkins/NodeSkinFree.GUISkin", GUISkin);
		//Debug.Log("This Is Free");
	}
	
	lineTex = AssetDatabase.LoadAssetAtPath(
					"Assets/ShaderFusion/Editor/MaterialTools/GUIAssets/LineTex.psd", Texture2D);
	
	socketTextStyle.alignment = TextAnchor.UpperLeft;
	
	MakeBackground();
	MakeBorder();
	MakeSelectedBorder();
	MakeEditorBackgroundStyle();
	
	nodeTypes = new Array();
	nodeTypeDummys = new Array();
	
	nodeTypes.Add(MaterialNode_TextureWithXForm);
	nodeTypes.Add(MaterialNode_TextureSample);
	nodeTypes.Add(MaterialNode_TextureCubeMap);
	
	nodeTypes.Add(MaterialNode_Constant);
	nodeTypes.Add(MaterialNode_ConstantColor);
	nodeTypes.Add(MaterialNode_Vector2);
	nodeTypes.Add(MaterialNode_Vector3);
	nodeTypes.Add(MaterialNode_Vector4);
	
	nodeTypes.Add(MaterialNode_Add);
	nodeTypes.Add(MaterialNode_Subtract);
	nodeTypes.Add(MaterialNode_Multiply);
	nodeTypes.Add(MaterialNode_Divide);
	
	nodeTypes.Add(MaterialNode_Fresnel);
	nodeTypes.Add(MaterialNode_Reflect);
	nodeTypes.Add(MaterialNode_Highest);
	nodeTypes.Add(MaterialNode_Lowest);
	nodeTypes.Add(MaterialNode_Clamp);
	nodeTypes.Add(MaterialNode_Interpolate);
	
	nodeTypes.Add(MaterialNode_UV1);
	nodeTypes.Add(MaterialNode_UV2);
	nodeTypes.Add(MaterialNode_PlaneReflection);
	nodeTypes.Add(MaterialNode_ScreenSize);
	nodeTypes.Add(MaterialNode_ScreenTexelSize);
	nodeTypes.Add(MaterialNode_VertexColor);
	nodeTypes.Add(MaterialNode_SurfaceNormal);
	nodeTypes.Add(MaterialNode_WorldNormal);
	nodeTypes.Add(MaterialNode_Position);
	nodeTypes.Add(MaterialNode_ScreenPos);
	nodeTypes.Add(MaterialNode_ScreenUVs);
	nodeTypes.Add(MaterialNode_ViewDir);
	nodeTypes.Add(MaterialNode_SceneColor);
	nodeTypes.Add(MaterialNode_SceneDepth);
	nodeTypes.Add(MaterialNode_Time);
	nodeTypes.Add(MaterialNode_TimeSeconds);
	
	nodeTypes.Add(MaterialNode_UnpackNormal);
	nodeTypes.Add(MaterialNode_DisplaceOffset);
	nodeTypes.Add(MaterialNode_InterlaceAlpha);
	nodeTypes.Add(MaterialNode_DepthBlend);
	
	nodeTypes.Add(MaterialNode_VectorX);
	nodeTypes.Add(MaterialNode_VectorY);
	nodeTypes.Add(MaterialNode_VectorZ);
	nodeTypes.Add(MaterialNode_VectorW);
	nodeTypes.Add(MaterialNode_VectorXY);
	nodeTypes.Add(MaterialNode_VectorXYZ);
	//nodeTypes.Add(MaterialNode_Vector4InvertY);
	nodeTypes.Add(MaterialNode_FloatToVector);
	nodeTypes.Add(MaterialNode_ElementOf);
	
	nodeTypes.Add(MaterialNode_Abs);
	nodeTypes.Add(MaterialNode_Distance);
	nodeTypes.Add(MaterialNode_Normalize);
	nodeTypes.Add(MaterialNode_Step);
	nodeTypes.Add(MaterialNode_Power);
	nodeTypes.Add(MaterialNode_Floor);
	nodeTypes.Add(MaterialNode_Ceil);
	nodeTypes.Add(MaterialNode_Cosine);
	nodeTypes.Add(MaterialNode_Sine);
	nodeTypes.Add(MaterialNode_Cross);
	nodeTypes.Add(MaterialNode_Dot);
	nodeTypes.Add(MaterialNode_SquareRoot);
	nodeTypes.Add(MaterialNode_Fmod);
	nodeTypes.Add(MaterialNode_Frac);
	
	nodeTypes.Add(MaterialNode_ParamFloat);
	nodeTypes.Add(MaterialNode_ParamColor);
	nodeTypes.Add(MaterialNode_ParamVector4);
	
	nodeTypes.Add(MaterialNode_GlobalFloat);
	nodeTypes.Add(MaterialNode_GlobalVector);
	nodeTypes.Add(MaterialNode_GlobalMatrix);
	nodeTypes.Add(MaterialNode_GlobalTexture);
	
	nodeTypes.Add(MaterialNode_Transform);
	nodeTypes.Add(MaterialNode_ObjToWorld);
	nodeTypes.Add(MaterialNode_ObjToWorldV3);
	nodeTypes.Add(MaterialNode_WorldToObj);
	nodeTypes.Add(MaterialNode_WorldToObjV3);
	nodeTypes.Add(MaterialNode_MVP);
	nodeTypes.Add(MaterialNode_MVPV3);
	
	nodeTypes.Add(MaterialNode_BakeSpecSwitch);
	
	nodeTypes.Add(MaterialNode_Hidden_LODInfo);
	nodeTypes.Add(MaterialNode_Hidden_FallbackInfo);
	nodeTypes.Add(MaterialNode_Hidden_DoubleSided);
	nodeTypes.Add(MaterialNode_Hidden_Lighting);
	
	nodeTypes.Add(MaterialNode_TextureMain);
	nodeTypes.Add(MaterialNode_TextureNormalMap);
	nodeTypes.Add(MaterialNode_TextureLightmap);
	
	
	for (i = 0; i < nodeTypes.length; i++) {
			newNode = nodeTypes[i]();
			newNode.Awake(this);
			nodeTypeDummys.Add(newNode);
	}
	
	SetBlendingMode("Normal");
	SetShaderModel("3.0");
	zWriteString = "";
	guiState = "editor";
}

function OnInit() {
	var initFileAsset:TextAsset = AssetDatabase.LoadAssetAtPath(
		"Assets/ShaderFusion/Editor/MaterialTools/InitFile.txt",TextAsset);
	var firstLoad:boolean = false;
	if (initFileAsset == null || initFileAsset.text == "") {
		firstLoad = true;
		var failed:boolean = false;
		var file:System.IO.StreamWriter;
		try {
			file = new System.IO.StreamWriter("Assets/ShaderFusion/Editor/MaterialTools/InitFile.txt"); 
		}
		catch(err) {
			EditorUtility.DisplayDialog ("", "something failed!", "Ok");
			failed = true;
		}
		if (!failed) {
			file.WriteLine("1");
			file.Close();
		}
	}
	if (firstLoad) {
		position.width = 700.0;
		position.height = 350.0;
		//Debug.Log("ShaderFusion first time init.");
		showQuickStart = true;
	}
	initFileAsset = null;
	started = true;
	Repaint();
}

function GUI_ShaderOptions() {
	GUI.BeginGroup(Rect(0,0,300,position.height));
		GUILayout.Label("Fallback:");
		var shaderFound:boolean = (Shader.Find(fallbackName) != null);
		if (!shaderFound) {
			GUI.color = Color(1,0.5,0.5,1);
		}
		fallbackName = EditorGUILayout.TextField(fallbackName);
		if (!shaderFound) {
			GUILayout.Label("Shader fallback was not found.");
		}
		else {
			GUILayout.Label("");
		}
		GUI.color = Color(1,1,1,1);
		SetFallbackName(fallbackName);
		var doubleSidedNode:MaterialNode = FindNodeWithName("DoubleSided");
		var backfacing:boolean = (doubleSidedNode.title2 == "Front");
		var doubleSided:boolean = (doubleSidedNode.title2 == "Off");
		backfacing = GUILayout.Toggle(backfacing,"Back Facing");
		doubleSided = GUILayout.Toggle(doubleSided,"Double Sided");
		doubleSidedNode.title2 = "Back";
		if (backfacing) {
			doubleSidedNode.title2 = "Front";
		}
		if (doubleSided) {
			doubleSidedNode.title2 = "Off";
		}
		/*
		var lightingNode:MaterialNode = FindNodeWithName("Lighting");
		var lighting:boolean = (lightingNode.title2 == "On");
		lighting = GUILayout.Toggle(lighting,"Use Lighting");
		if (lighting) {
			lightingNode.title2 = "On";
		}
		else {
			lightingNode.title2 = "Off";
		}
		*/
	GUI.EndGroup();
	if (GUI.Button(Rect(Mathf.Max(position.width-130,300),position.height-50,100,20), "Close Options")) {
		guiState = "editor";
	}
	if (GUI.Button(Rect(Mathf.Max(position.width-230,300),20,200,20), "Open ShaderFusion Website")) {
		Application.OpenURL("http://keenleveldesign.com/shaderfusion/");
	}
}

function OnGUI() {
	//if (wasPlaying != Application.isPlaying) {
	//	Close();
		//LoadShader(currentShaderPath);
	//	return;
	//}
	if (showQuickStart) {
		if (!started) return;
		if (Event.current.type == EventType.MouseDown) {
			showQuickStart = false;
			if (isPro) {
				EditorUtility.DisplayDialog ("Deferred Rendering", "It is recomended that you use Deferred Lighting render path with ShaderFusion. You can enable this in Edit>Player Settings>Other Settings.", "Ok");
				Repaint();
			}
		}
		GUI.Box(Rect(0,0,700, 350), "",nodeSkin.horizontalSliderThumb);
		return;
	}
	else {
		if (guiState == "shaderoptions") {
			GUI_ShaderOptions();
			return;
		}
	}
	mousePosition = Event.current.mousePosition;
	if (Event.current.type == EventType.MouseDown) {
		mouseDragDelta = Vector2(0,0);
		dragDownPos = mousePosition-cameraOffset;
		mouseDragging = Event.current.button;
	}
	if (Event.current.type == EventType.MouseUp) {
		mouseDragging = -1;
	}
	
	if (mousePosition.x < 0 || mousePosition.y < 0 ||
		mousePosition.x > position.width || mousePosition.y > position.height) {
		mouseDragging = -1;
	}
	
	mouseDragDelta = mouseDragDelta-mousePosition;
	var clickedEmpty:boolean = true;
	//Delete nodes
	if ((Event.current.type == EventType.KeyDown || true) &&
		(Event.current.keyCode == KeyCode.Delete || 
		(Event.current.keyCode == KeyCode.Backspace && Event.current.command))) {
		
		var socketsToDelete:Array = new Array();
		for (i = 0; i < selectedNodes.length; i++) {
			nodes.Remove(selectedNodes[i]);
		}
		for (i = 0; i < nodes.length; i++) {
			if (nodes[i].hidden) continue;
			socketsToDelete = new Array();
			for (j = 0; j < nodes[i].inputs.length; j++) {
				for (k = 0; k < nodes[i].inputs[j].connections.length; k++) {
					if (!DoesNodeExist(nodes[i].inputs[j].connections[k].parent)) {
						socketsToDelete.Add(nodes[i].inputs[j].connections[k]);
					}
				}
				for (k = 0; k < socketsToDelete.length; k++) {
					nodes[i].inputs[j].connections.Remove(socketsToDelete[k]);
				}
			}
			for (j = 0; j < nodes[i].outputs.length; j++) {
				socketsToDelete = new Array();
				for (k = 0; k < nodes[i].outputs[j].connections.length; k++) {
					if (!DoesNodeExist(nodes[i].outputs[j].connections[k].parent)) {
						socketsToDelete.Add(nodes[i].outputs[j].connections[k]);
					}
				}
				for (k = 0; k < socketsToDelete.length; k++) {
					nodes[i].outputs[j].connections.Remove(socketsToDelete[k]);
				}
			}

		}
		updateNodesWithoutMaster();
	}
	if (!MouseInUI()) {
		//Add nodes
		/*
		if (Event.current.type == EventType.MouseUp &&
			Event.current.button == 1 && lastNodeIndex >= 0) {
				newNode = nodeTypes[lastNodeIndex]();
				newNode.position = Event.current.mousePosition;
				newNode.position -= cameraOffset;
				newNode.position.x -= newNode.size.x;
				newNode.Awake();
				nodes.Add(newNode);
				updateNodesWithoutMaster();
		}
		*/
		//move nodes
		if (Event.current.type == EventType.MouseDrag &&
			Event.current.button == 0) {
			for (i = 0; i < selectedNodes.length; i++) {
				selectedNodes[i].position += Event.current.delta;
			}
		}
		
		//click socket
		if (Event.current.type == EventType.MouseDown &&
			Event.current.button == 0 && draggingSocket == null) {
			var mp:Vector2 = Event.current.mousePosition;
			for (i = 0; i < nodes.length; i++) {
				if (nodes[i].hidden) continue;
				for (j = 0; j < nodes[i].outputs.length; j++) {
					var op:Vector2 = nodes[i].outputs[j].screenPosition;
					if ((mp.x >= op.x) && (mp.y >= op.y) &&
						(mp.x <= op.x+10) && (mp.y <= op.y+10)) {
						draggingSocket = nodes[i].outputs[j];
						draggingType = "output";
						draggingStartPos = mp;
						selectedNodes.Clear();
					}
				}
				for (j = 0; j < nodes[i].inputs.length; j++) {
					op = nodes[i].inputs[j].screenPosition;
					if ((mp.x >= op.x) && (mp.y >= op.y) &&
						(mp.x <= op.x+10) && (mp.y <= op.y+10)) {
						draggingSocket = nodes[i].inputs[j];
						draggingType = "input";
						draggingStartPos = mp;
						selectedNodes.Clear();
					}
				}
			}
		}
		
		//clear socket
		if (Event.current.type == EventType.MouseUp &&
			Event.current.button == 1) {
			mp = Event.current.mousePosition;
			var tmpArray = new Array();
			for (i = 0; i < nodes.length; i++) {
				if (nodes[i].hidden) continue;
				for (j = 0; j < nodes[i].outputs.length; j++) {
					op = nodes[i].outputs[j].screenPosition;
					if ((mp.x >= op.x) && (mp.y >= op.y) &&
						(mp.x <= op.x+10) && (mp.y <= op.y+10)) {
						tmpArray.Add(nodes[i].outputs[j]);
						nodes[i].outputs[j].connections.Clear();
					}
				}
				for (j = 0; j < nodes[i].inputs.length; j++) {
					op = nodes[i].inputs[j].screenPosition;
					if ((mp.x >= op.x) && (mp.y >= op.y) &&
						(mp.x <= op.x+10) && (mp.y <= op.y+10)) {
						tmpArray.Add(nodes[i].inputs[j]);
						nodes[i].inputs[j].connections.Clear();
					}
				}
			}
			for (i = 0; i < nodes.length; i++) {
				if (nodes[i].hidden) continue;
				for (j = 0; j < tmpArray.length; j++) {
					for (k = 0; k < nodes[i].inputs.length; k++) {
						nodes[i].inputs[k].connections.Remove(tmpArray[j]);
					}
					for (k = 0; k < nodes[i].outputs.length; k++) {
						nodes[i].outputs[k].connections.Remove(tmpArray[j]);
					}
				}
			}
		}
		
		//unclick socket
		if (Event.current.type == EventType.MouseUp &&
			Event.current.button == 0 && draggingSocket != null) {
			var hitNothing:boolean = true;
			mp = Event.current.mousePosition;
			if (Vector2.Distance(draggingStartPos,mp) < 2.0) {
				hitNothing = false;
			}
			for (i = 0; i < nodes.length; i++) {
				if (nodes[i].hidden) continue;
				//if (draggingSocket == null) break;
				if (draggingType == "input") {
					for (j = 0; j < nodes[i].outputs.length; j++) {
						if (draggingSocket == null) break;
						op = nodes[i].outputs[j].screenPosition;
						if ((mp.x >= op.x) && (mp.y >= op.y) &&
							(mp.x <= op.x+10) && (mp.y <= op.y+10)) {
							if (nodes[i].outputs[j] != draggingSocket) {
								if (!nodes[i].outputs[j].HasConnection(draggingSocket) &&
									draggingSocket.connections.length <= 0) {
									nodes[i].outputs[j].connections.Add(draggingSocket);
									draggingSocket.connections.Add(nodes[i].outputs[j]);
									draggingSocket = null;
								}
							}
						}
					}
				}
				if (draggingType == "output") {
					for (j = 0; j < nodes[i].inputs.length; j++) {
						if (draggingSocket == null) break;
						op = nodes[i].inputs[j].screenPosition;
						if ((mp.x >= op.x) && (mp.y >= op.y) &&
							(mp.x <= op.x+10) && (mp.y <= op.y+10)) {
							if (nodes[i].inputs[j] != draggingSocket) {
								if (!draggingSocket.HasConnection(nodes[i].inputs[j]) &&
									nodes[i].inputs[j].connections.length <= 0) {
									draggingSocket.connections.Add(nodes[i].inputs[j]);
									nodes[i].inputs[j].connections.Add(draggingSocket);
									draggingSocket = null;
								}
							}
						}
					}
				}
			}
			if (hitNothing) {
				draggingSocket = null;
			}
		}
	}
	
	//Panning
	if (mouseDragging == 2) {
		cameraOffset = mousePosition-dragDownPos;
	}
	
	//Draw Background
	if (showLogo) {
		GUI.color = Color(1,1,1,0.75);
		GUI.Box(Rect(position.width-384,position.height-384,384, 384), "",nodeSkin.window);
		GUI.color = Color(1,1,1,1);
	}
	//Draw all the nodes only when these events happen
	var nodesToDraw:int = nodes.length;
	if (Event.current.type != EventType.Repaint &&
		Event.current.type != EventType.MouseUp &&
		Event.current.type != EventType.MouseDown &&
		Event.current.type != EventType.KeyUp &&
		Event.current.type != EventType.KeyDown &&
		(!MouseInUI() || mouseDragging == 2)) {
		nodesToDraw = 0;
	}
	
	//Draw nodes.
	for (i = 0; i < nodesToDraw; i++) {
		
		if (nodes[i].hidden) continue;
		var offScreen:boolean = false;
		if (nodes[i].position.y+nodes[i].size.y < -cameraOffset.y) offScreen = true;
		if (nodes[i].position.x+nodes[i].size.x < -cameraOffset.x) offScreen = true;
		if (nodes[i].position.y-10 > -cameraOffset.y+position.height) offScreen = true;
		if (nodes[i].position.x-10 > -cameraOffset.x+position.width) offScreen = true;
		var nodeRect:Rect;
		var nodeBorderRect:Rect;
		var nodeTitleRect:Rect;
		var nodePos:Vector2;
		nodePos = nodes[i].position;
		nodePos += cameraOffset;
		nodeRect = Rect(nodePos.x,nodePos.y,nodes[i].size.x,nodes[i].size.y);
		nodeBorderRect = Rect(nodeRect.x-1,nodeRect.y-1,nodeRect.width+2,nodeRect.height+2);
		
		if (!offScreen) {
			var nodeShadowRect:Rect = Rect(nodePos.x,nodePos.y,nodes[i].size.x,nodes[i].size.y);
			nodeShadowRect.x -= 8;
			nodeShadowRect.y -= 8;
			nodeShadowRect.width += 16;
			nodeShadowRect.height += 16;
			GUI.Box(nodeRect, "",nodeSkin.horizontalSlider);
			//Draw the node border
			if (IsNodeSelected(nodes[i]))
				GUI.Box(nodeBorderRect, "",nodeSkin.toggle);
			else 
				GUI.Box(nodeBorderRect, "",nodeSkin.button);
			
			if (nodes[i].selectable) {
				//Draw the node body and check if it was clicked
				if (Event.current.type == EventType.MouseDown && Event.current.button == 0 &&
					(mousePosition.x >= nodePos.x) && 
					(mousePosition.y >= nodePos.y-16) &&
					(mousePosition.x <= nodePos.x+nodes[i].size.x) && 
					(mousePosition.y <= nodePos.y+nodes[i].size.y) &&
					!MouseInUI()) {
					if (!EditorGUI.actionKey)
						selectedNodes.Clear();
					if (!IsNodeSelected(nodes[i]))
						selectedNodes.Add(nodes[i]);
					clickedEmpty = false;
				}
			}
			//Draw the title border
			nodeTitleRect = nodeBorderRect;
			nodeTitleRect.y -= 15;
			nodeTitleRect.height = 16;
			socketTextStyle.alignment = TextAnchor.UpperLeft;
			//nodeTitleRect.x += 1;
			//nodeTitleRect.y += 1;
			//nodeTitleRect.width -= 2;
			//nodeTitleRect.height -= 2;
			
			//GUI.color = Color(Random.Range(0.0,1.0),1,1,1);
			if (IsNodeSelected(nodes[i]))
				GUI.Box(nodeTitleRect, "",nodeSkin.label);
			else
				GUI.Box(nodeTitleRect, "",nodeSkin.box);
			//GUI.color = Color(1,1,1,1);
			
			if (nodes[i].title2 != null)
				GUI.Label(nodeTitleRect, nodes[i].title2, socketTextStyle);
			else
				GUI.Label(nodeTitleRect, nodes[i].title, socketTextStyle);
			
			
			//Node Icon
			if (nodes[i].icon) {
				var nodePreviewRect:Rect;
				nodePreviewRect=Rect(nodePos.x,nodePos.y,nodes[i].icon.width,nodes[i].icon.height);
				if (!nodes[i].noOutputText)
					nodePreviewRect.x += (nodes[i].size.x/2)-(nodes[i].icon.width/2);
				else
					nodePreviewRect.x += (nodes[i].size.x)-(nodes[i].icon.width);
				//nodePreviewRect.y += (nodes[i].size.x)/2;
				GUI.color = Color(1,1,1,0.75);
				GUI.DrawTexture(nodePreviewRect, nodes[i].icon);
				GUI.color = Color(1,1,1,1);
			}
			//Node preview
			if (nodes[i].drawPreview) {
				nodePreviewRect=Rect(nodePos.x,nodePos.y,nodes[i].previewSize.x,nodes[i].previewSize.y);
				nodePreviewRect.x += (nodes[i].size.x/2)-(nodes[i].previewSize.x/2);
				nodePreviewRect.y += (nodes[i].size.x-nodes[i].previewSize.x)/2;
				GUI.Box(nodePreviewRect, nodes[i].previewTex,nodeStyle);
			}
			
		}
		
		//Draw inputs
		Handles.color = lineColor;
		for (j = 0; j < nodes[i].inputs.length; j++) {
			//Handles.color = Color.red;
			var nodeInputRect:Rect = Rect(nodePos.x,nodePos.y,nodes[i].inputs[j].size.x,nodes[i].inputs[j].size.y);
			nodeInputRect.x -= 10;
			nodeInputRect.y += (j*15) + 3;
			if (!offScreen)
				GUI.Box(nodeInputRect, "",nodeSkin.textField);
			nodes[i].inputs[j].screenPosition = Vector2(nodeInputRect.x,nodeInputRect.y);
			if (nodes[i].size.y < (j*15)+3+10) nodes[i].size.y = (j*15)+3+10;
			
			//debug to make sure there is no socket link errors
			//for (k = 0; k < nodes[i].inputs[j].connections.length; k++) {
			//	var destCon:MaterialNodeSocket = nodes[i].inputs[j].connections[k];
			//	var destConPos:Vector2 = Vector2(destCon.screenPosition.x+5, destCon.screenPosition.y+5);
				//Handles.DrawLine(Vector2(nodeInputRect.x+5, nodeInputRect.y+5), destConPos);
			//}
			
			if (draggingSocket == nodes[i].inputs[j] && draggingType == "input") {
				//Handles.DrawLine(Vector2(nodeInputRect.x+5, nodeInputRect.y+5), Event.current.mousePosition);
				destConPos = Vector3(Event.current.mousePosition.x,Event.current.mousePosition.y,0);
				xDist = Vector3(0.5,0,0)*-Mathf.Abs(destConPos.x-(nodeInputRect.x+5));
				Handles.DrawBezier(Vector3(nodeInputRect.x+5, nodeInputRect.y+5,0), destConPos, Vector3(nodeInputRect.x+5, nodeInputRect.y+5,0)+xDist, destConPos-xDist, Handles.color, lineTex, lineWidth);
			}
			if (!offScreen) {
				//Draw input title
				nodeInputRect.x = nodeRect.x;
				nodeInputRect.width = nodes[i].size.x*0.5;
				if (nodes[i].outputs.length == 0)
					nodeInputRect.width = nodes[i].size.x;
				nodeInputRect.height = 20;
				socketTextStyle.alignment = TextAnchor.UpperLeft;
				GUI.Label(nodeInputRect, nodes[i].inputs[j].title, socketTextStyle);
			}
		}
		
		//DrawOutputs
		//Handles.color = Color.black;
		for (j = 0; j < nodes[i].outputs.length; j++) {
			var nodeOutputRect:Rect = Rect(nodePos.x,nodePos.y,nodes[i].outputs[j].size.x,nodes[i].outputs[j].size.y);
			nodeOutputRect.x += nodes[i].size.x;
			nodeOutputRect.y += (j*15) + 3;
			if (!offScreen)
				GUI.Box(nodeOutputRect, "",nodeSkin.textArea);
			nodes[i].outputs[j].screenPosition = Vector2(nodeOutputRect.x,nodeOutputRect.y);
			if (nodes[i].size.y < (j*15)+3+10) nodes[i].size.y = (j*15)+3+10;
			
			for (k = 0; k < nodes[i].outputs[j].connections.length; k++) {
				destCon = nodes[i].outputs[j].connections[k];
				destConPos = Vector3(destCon.screenPosition.x+5, destCon.screenPosition.y+5,0);
				xDist = Vector3(0.5,0,0)*Mathf.Abs(destConPos.x-nodeOutputRect.x+5);
				Handles.DrawBezier(Vector3(nodeOutputRect.x+5, nodeOutputRect.y+5,0), destConPos, Vector3(nodeOutputRect.x+5, nodeOutputRect.y+5,0)+xDist, destConPos-xDist, Handles.color, lineTex, lineWidth);
			}
			if (draggingSocket == nodes[i].outputs[j] && draggingType == "output") {
				destConPos = Vector3(Event.current.mousePosition.x,Event.current.mousePosition.y,0);
				xDist = Vector3(0.5,0,0)*Mathf.Abs(destConPos.x-nodeOutputRect.x+5);
				Handles.DrawBezier(Vector3(nodeOutputRect.x+5, nodeOutputRect.y+5,0), destConPos, Vector3(nodeOutputRect.x+5, nodeOutputRect.y+5,0)+xDist, destConPos-xDist, Handles.color, lineTex, lineWidth);
			}
			
			if (!offScreen) {
				//Draw output title
				nodeOutputRect.x = nodeRect.x;
				nodeOutputRect.x += nodes[i].size.x*0.5;
				nodeOutputRect.width = nodes[i].size.x*0.5;
				nodeOutputRect.height = 20;
				socketTextStyle.alignment = TextAnchor.UpperRight;
				if (!nodes[i].icon && !nodes[i].noOutputText)
					GUI.Label(nodeOutputRect, nodes[i].outputs[j].title, socketTextStyle);
			}
		}
		
	}
	
	//deselect all if the user clicked on empty
	if (clickedEmpty && !MouseInUI() && 
		Event.current.type == EventType.MouseDown &&
		Event.current.button == 0) {
		selectedNodes.Clear();
	}
	
	//if (currentShaderPath != "")
	//	GUI.Label(Rect(125,16,700,16), currentShaderPath);
	//else
	//	GUI.Label(Rect(125,16,700,16), "No shader loaded. Select your shader in the project window and then click \"Load Selected Shader\"");
	
	
	//Toolbar
	GUILayout.BeginHorizontal (EditorStyles.toolbar);
	if (GUI.Button(Rect(1,-1,130,15),"Open Shader", EditorStyles.toolbarButton)) {
		currentShaderPath = EditorUtility.OpenFilePanel("Open shader", Application.dataPath, "shader");
		if (currentShaderPath != "") {
			currentShaderPath = GetLocalDirectory(currentShaderPath);
			LoadShader(currentShaderPath);
		}
	}
	if (GUI.Button(Rect(120,-1,130,15),"Open Selected Shader", EditorStyles.toolbarButton)) {
		var theSelection:Array = Selection.objects;
		if (theSelection.length > 0 && theSelection[0] instanceof Shader) {
			currentShaderPath = AssetDatabase.GetAssetPath(theSelection[0]);
			LoadShader(currentShaderPath);
		}
		else {
			EditorUtility.DisplayDialog ("", "You must select a shader in the project window first.", "Ok");
		}

	}
	if (GUI.Button(Rect(250,-1,80,15),"Save Shader", EditorStyles.toolbarButton)) {
		try{
		shaderGen.SaveCurrentShader();
		} catch(err){
			EditorUtility.DisplayDialog ("", "There was an error while saving!\n"+err, "Ok");
		}
		//Make a new shader generator.
		shaderGen = new MaterialShaderGen(this);
	}
	EditorGUILayout.Space();
	GUILayout.EndHorizontal();
	
	//Open shader options
	if (GUI.Button(Rect(Mathf.Max(position.width-100-65-35-30-85,330),-1,85,15), "More options", EditorStyles.toolbarDropDown)) {
		guiState = "shaderoptions";
	}
	//LOD Value
	EditorGUI.LabelField(Rect(Mathf.Max(position.width-100-65-35-30,330+80),0,30,17), "LOD","");
	lodValue = EditorGUI.IntField(Rect(Mathf.Max(position.width-100-65-35,330+80+30),0,35,17), lodValue);
	SetLodValue(lodValue);
	
	//BlendingMode DropDown
	if (GUI.Button(Rect(Mathf.Max(position.width-100-65,330+80+65),-1,100,15),"Blend: "+blendingName, EditorStyles.toolbarDropDown)) {
		showBlendingDropdown = !showBlendingDropdown;
	}
	if (showBlendingDropdown){
		if (GUI.Button(Rect (Mathf.Max(position.width-100-65,330+80+65),14+2,100,15), "Normal")){
			SetBlendingMode("Normal");
			showBlendingDropdown = false;
		}
		if (GUI.Button(Rect (Mathf.Max(position.width-100-65,330+80+65),28+2,100,15), "Additive")){
			SetBlendingMode("Additive");
			showBlendingDropdown = false;
		}
		if (GUI.Button(Rect (Mathf.Max(position.width-100-65,330+80+65),42+2,100,15), "Alpha")){
			SetBlendingMode("Alpha");
			showBlendingDropdown = false;
		}
	}
	
	//ShaderModel DropDown
	if (GUI.Button(Rect(Mathf.Max(position.width-65,330+80+100+64),-1,65,15),"SM: "+smString, EditorStyles.toolbarDropDown)) {
		showSMDropdown = !showSMDropdown;
	}
	if (showSMDropdown){
		if (GUI.Button(Rect (Mathf.Max(position.width-65,330+80+100+64),14+2,65,15), "3.0")){
			SetShaderModel("3.0");
			showSMDropdown = false;
		}
		if (GUI.Button(Rect (Mathf.Max(position.width-65,330+80+100+64),28+2,65,15), "5.0")){
			SetShaderModel("5.0");
			showSMDropdown = false;
		}
	}
	
	//Node selection
	GUI.Box(Rect (0,16,121,position.height-15), "",nodeSkin.textField);
	var actualNodeCount:int = 0;
	for (i = 0; i < nodeTypes.length; i++) {
		if (nodeTypeDummys[i].hidden || nodeTypeDummys[i].deprecated) continue;
		actualNodeCount++;
	}
	nodeScrollPosition = GUI.BeginScrollView (Rect (0,16,120,position.height-15),
	nodeScrollPosition, Rect (0, 0, 95, Mathf.Max(position.height-15,actualNodeCount*16)), false, true);
	
	for (i = 0; i < nodeTypes.length; i++) {
		if (nodeTypeDummys[i].hidden) continue;
		if (GUI.Button(Rect (0,i*16,105,16), nodeTypeDummys[i].title)) {
			if (currentShaderPath == "") {
				EditorUtility.DisplayDialog ("", "No Shader loaded. Select a shader in the project window and then click \"Load Selected Shader\".", "Ok");
			}
			else {
				newNode = nodeTypes[i]();
				newNode.position.x = position.width/2;
				newNode.position.y = position.height/2;
				newNode.position -= cameraOffset;
				newNode.position.x -= newNode.size.x;
				newNode.Awake(this);
				nodes.Add(newNode);
				updateNodesWithoutMaster();
				lastNodeIndex = i;
				newNode.OnCreateNode();
			}
		}
	}
	GUI.EndScrollView();
	
	//Inspector
	inspectorRect = Rect(0,0,0,0);
	if (selectedNodes.length == 1) {
		var inspectorHeight:float = selectedNodes[0].inputs.length;
		if (inspectorHeight == 0)
			inspectorHeight = selectedNodes[0].outputs.length;
		if (selectedNodes[0].title2 != null) inspectorHeight += 1;
		inspectorHeight *= 32;
		inspectorHeight += 32;
		inspectorRect = Rect(position.width-200,position.height-inspectorHeight,200,inspectorHeight);
		shadowRect = inspectorRect;
		shadowRect.y += 12;
		GUI.Box(shadowRect, "",nodeSkin.horizontalSlider);
		GUI.color = Color(0,0,0,1);
		GUI.Box(inspectorRect, "",nodeStyle);
		inspectorRect.x += 1; inspectorRect.y += 1;
		GUI.color = Color(1,1,1,1);
		GUI.Box(inspectorRect, "",nodeStyle);
		inspectorRect.y += 16;
		inspectorRect.width -= 10;
		inspectorRect.height = 16;
		var inputSpace:int = 0;
		if (selectedNodes[0].title2 != null) {
			var elementRect:Rect = inspectorRect;
			elementRect.y += inputSpace*32;
			selectedNodes[0].title2 = EditorGUI.TextField(elementRect, "Name", selectedNodes[0].title2);
			inputSpace += 1;
		}
		for (i = 0; i < selectedNodes[0].inputs.length; i++) {
			if (selectedNodes[0].inputs[i].connections.length == 0) {
				elementRect = inspectorRect;
				elementRect.y += inputSpace*32;
				//elementRect.height +=  inputSpace*32;
				if (selectedNodes[0].inputs[i].value instanceof  float) {
				selectedNodes[0].inputs[i].value = EditorGUI.FloatField(elementRect, selectedNodes[0].inputs[i].title, selectedNodes[0].inputs[i].value);
				}
				if (selectedNodes[0].inputs[i].value instanceof  Color) {
				selectedNodes[0].inputs[i].value = EditorGUI.ColorField(elementRect, selectedNodes[0].inputs[i].title, selectedNodes[0].inputs[i].value);
				}
				if (selectedNodes[0].inputs[i].value instanceof  Vector4) {
				selectedNodes[0].inputs[i].value = EditorGUI.Vector4Field(elementRect, selectedNodes[0].inputs[i].title, selectedNodes[0].inputs[i].value);
				}
				if (selectedNodes[0].inputs[i].value instanceof  Vector3) {
				selectedNodes[0].inputs[i].value = EditorGUI.Vector3Field(elementRect, selectedNodes[0].inputs[i].title, selectedNodes[0].inputs[i].value);
				}
				if (selectedNodes[0].inputs[i].value instanceof  Vector2) {
				selectedNodes[0].inputs[i].value = EditorGUI.Vector2Field(elementRect, selectedNodes[0].inputs[i].title, selectedNodes[0].inputs[i].value);
				}
				inputSpace += 1;
			}
		}
		if (selectedNodes[0].inputs.length == 0) {
			for (i = 0; i < selectedNodes[0].outputs.length; i++) {
				elementRect = inspectorRect;
				elementRect.y += inputSpace*32;
				//elementRect.height +=  inputSpace*32;
				if (selectedNodes[0].outputs[i].hiddenData == null) {
					if (selectedNodes[0].outputs[i].value instanceof  float) {
					selectedNodes[0].outputs[i].value = EditorGUI.FloatField(elementRect, selectedNodes[0].outputs[i].title, selectedNodes[0].outputs[i].value);
					}
					if (selectedNodes[0].outputs[i].value instanceof  Color) {
					selectedNodes[0].outputs[i].value = EditorGUI.ColorField(elementRect, selectedNodes[0].outputs[i].title, selectedNodes[0].outputs[i].value);
					}
					if (selectedNodes[0].outputs[i].value instanceof  Vector4) {
					selectedNodes[0].outputs[i].value = EditorGUI.Vector4Field(elementRect, selectedNodes[0].outputs[i].title, selectedNodes[0].outputs[i].value);
					}
					if (selectedNodes[0].outputs[i].value instanceof  Vector3) {
					selectedNodes[0].outputs[i].value = EditorGUI.Vector3Field(elementRect, selectedNodes[0].outputs[i].title, selectedNodes[0].outputs[i].value);
					}
					if (selectedNodes[0].outputs[i].value instanceof  Vector2) {
					selectedNodes[0].outputs[i].value = EditorGUI.Vector2Field(elementRect, selectedNodes[0].outputs[i].title, selectedNodes[0].outputs[i].value);
					}
				}
				else {
					if (selectedNodes[0].outputs[i].hiddenData instanceof  float) {
					selectedNodes[0].outputs[i].hiddenData = EditorGUI.FloatField(elementRect, selectedNodes[0].outputs[i].title, selectedNodes[0].outputs[i].hiddenData);
					}
					if (selectedNodes[0].outputs[i].hiddenData instanceof  Color) {
					selectedNodes[0].outputs[i].hiddenData = EditorGUI.ColorField(elementRect, selectedNodes[0].outputs[i].title, selectedNodes[0].outputs[i].hiddenData);
					}
					if (selectedNodes[0].outputs[i].hiddenData instanceof  Vector4) {
					selectedNodes[0].outputs[i].hiddenData = EditorGUI.Vector4Field(elementRect, selectedNodes[0].outputs[i].title, selectedNodes[0].outputs[i].hiddenData);
					}
					if (selectedNodes[0].outputs[i].hiddenData instanceof  Vector3) {
					selectedNodes[0].outputs[i].hiddenData = EditorGUI.Vector3Field(elementRect, selectedNodes[0].outputs[i].title, selectedNodes[0].outputs[i].hiddenData);
					}
					if (selectedNodes[0].outputs[i].hiddenData instanceof  Vector2) {
					selectedNodes[0].outputs[i].hiddenData = EditorGUI.Vector2Field(elementRect, selectedNodes[0].outputs[i].title, selectedNodes[0].outputs[i].hiddenData);
					}
				}
				inputSpace += 1;
			}
		}
		//Reset the inspectorRect
		inspectorRect = Rect(position.width-200,position.height-inspectorHeight,200,inspectorHeight);
	}
	
	//Reset mouse drag delta
	mouseDragDelta = Vector2(0,0);
	lastMousePos = mousePosition;
}


function Update () {
	if (wasPlaying != Application.isPlaying) {
		//Close();
		LoadShader(currentShaderPath);
		return;
	}
	if (position.Contains(lastMousePos+Vector2(position.x,position.y))) {
		Repaint();
	}
	if (!started) {
		OnInit();
	}
}

function PickFallbackShader():String {
		path = EditorUtility.OpenFilePanel("Open shader", Application.dataPath, "shader");
		if (path != "") {
			path = GetLocalDirectory(path);
			var shaderText:TextAsset;
			AssetDatabase.CopyAsset(path, path+".txt");
			AssetDatabase.ImportAsset(path+".txt");
			shaderText = AssetDatabase.LoadAssetAtPath(path+".txt",TextAsset);
			if (shaderText == null){
				//EditorUtility.DisplayDialog ("", "Shader path was invalid.", "Ok");
				AssetDatabase.DeleteAsset(path+".txt");
				return "Fallback Name";
			}
			var shaderTextString:String = shaderText.text;
			AssetDatabase.DeleteAsset(path+".txt");
			shaderAsLines = shaderTextString.Split("\n"[0]);
			for (i = 0; i < shaderAsLines.length; i++) {
				var line:String = shaderAsLines[i];
				var shaderStartPos:int = line.IndexOf("Shader \"");
				if (shaderStartPos != -1) {
					var endPos:int = line.IndexOf("\"",shaderStartPos+8);
					if (endPos == -1) continue;
					Debug.Log(i+" "+(shaderStartPos+8)+" "+endPos);
					if (shaderStartPos >= line.length || endPos >= line.length) continue;
					var name:String = line.Substring(shaderStartPos+8,endPos-(shaderStartPos+8));
					Debug.Log(name);
					return name;
				}
			}
		}
		return fallbackName;
}

function UpdateHiddenInfoNodes() {
	var lodInfoNode:MaterialNode = FindNodeWithName("LODInfo");
	if (lodInfoNode == null) {
		lodInfoNode = MaterialNode_Hidden_LODInfo();
		lodInfoNode.Awake(this);
		lodInfoNode.outputs[0].hiddenData = lodValue;
		nodes.Add(lodInfoNode);
		updateNodesWithoutMaster();
	}
	lodValue = lodInfoNode.outputs[0].hiddenData;
	
	var fallbackInfoNode:MaterialNode = FindNodeWithName("FallbackInfo");
	if (fallbackInfoNode == null) {
		fallbackInfoNode = MaterialNode_Hidden_FallbackInfo();
		fallbackInfoNode.Awake(this);
		fallbackInfoNode.title2 = fallbackName;
		nodes.Add(fallbackInfoNode);
		updateNodesWithoutMaster();
	}
	fallbackName = fallbackInfoNode.title2;
	
	var doubleSidedNode:MaterialNode = FindNodeWithName("DoubleSided");
	if (doubleSidedNode == null) {
		doubleSidedNode = MaterialNode_Hidden_DoubleSided();
		doubleSidedNode.Awake(this);
		doubleSidedNode.title2 = "Back";
		nodes.Add(doubleSidedNode);
		updateNodesWithoutMaster();
	}
	
	var lightingNode:MaterialNode = FindNodeWithName("Lighting");
	if (lightingNode == null) {
		lightingNode = MaterialNode_Hidden_Lighting();
		lightingNode.Awake(this);
		lightingNode.title2 = "On";
		nodes.Add(lightingNode);
		updateNodesWithoutMaster();
	}
}

function SetLodValue(value:float) {
	var lodInfoNode:MaterialNode = FindNodeWithName("LODInfo");
	if (!lodInfoNode) Debug.Log("ERROR!");
	lodInfoNode.outputs[0].hiddenData = value;
	lodValue = value;
}

function SetFallbackName(value:String) {
	var fallbackInfoNode:MaterialNode = FindNodeWithName("FallbackInfo");
	if (!fallbackInfoNode) Debug.Log("ERROR!");
	fallbackInfoNode.title2 = value;
	fallbackName = value;
	if (fallbackName != "Fallback Name") {
		if (!Shader.Find(fallbackName)) {
			GUI.Label(Rect(330,20,position.width,17),  "Invalid shader name: \""+fallbackName+"\"");
		}
	}
}

function SetBlendingMode(mode:String) {
	if (mode[mode.length-1] == "\n") {
		mode = mode.Substring(0,mode.length-2);
	}
	if (mode.length >= "Normal".length && mode.Substring(0,"Normal".length) == "Normal") {
		blendingName = mode;
		deferredBlendingString = "";
		litBlendingString = "Blend One One\n AlphaTest Greater [_Cutoff]";
		unlitBlendingString = "AlphaTest Greater [_Cutoff]";
		deferredCatTags = "Tags { \"RenderType\"=\"Opaque\" }";
		catTags = "";
		zWriteString = "ZWrite On";
		deferredParams = "alphatest:_Cutoff";
		return;
	}
	if (mode.length >= "Additive".length && mode.Substring(0,"Additive".length) == "Additive"){
		blendingName = mode;
		deferredBlendingString = "Blend One One";
		litBlendingString = "Blend One One";
		unlitBlendingString = "Blend One One";
		deferredCatTags = "Tags {\"Queue\"=\"Transparent\" \"IgnoreProjector\"=\"True\" \"RenderType\"=\"Transparent\"}";
		catTags = "Tags { \"Queue\"=\"Transparent\"}";
		zWriteString = "ZWrite Off";
		deferredParams = "exclude_path:prepass";
		return;
	}
	if (mode.length >= "MultiplyX2".length && mode.Substring(0,"MultiplyX2".length) == "MultiplyX2"){
		blendingName = mode;
		deferredBlendingString = "Blend DstColor SrcColor";
		litBlendingString = "Blend One One";
		unlitBlendingString = "Blend DstColor SrcColor";
		deferredCatTags = "Tags {\"Queue\"=\"Transparent\" \"IgnoreProjector\"=\"True\" \"RenderType\"=\"Transparent\"}";
		catTags = "Tags { \"Queue\"=\"Transparent\"}";
		zWriteString = "ZWrite Off";
		deferredParams = "exclude_path:prepass";
		return;
	}
	if (mode.length >= "Alpha".length && mode.Substring(0,"Alpha".length) == "Alpha"){
		blendingName = mode;
		deferredBlendingString = "Blend SrcAlpha OneMinusSrcAlpha";
		litBlendingString = "Blend One One";
		unlitBlendingString = "Blend SrcAlpha OneMinusSrcAlpha";
		deferredCatTags = "Tags {\"Queue\"=\"Transparent\" \"IgnoreProjector\"=\"True\" \"RenderType\"=\"Transparent\"}";
		catTags = "Tags { \"Queue\"=\"Transparent\"}";
		zWriteString = "ZWrite Off";
		deferredParams = "exclude_path:prepass";
		return;
	}
	if (mode == "MultiplyX2 Unlit/Lights"){
		blendingName = mode;
		deferredBlendingString = "Blend DstColor SrcColor";
		litBlendingString = "Blend DstColor SrcColor";
		unlitBlendingString = "Blend DstColor SrcColor";
		deferredCatTags = "Tags {\"Queue\"=\"Transparent\" \"IgnoreProjector\"=\"True\" \"RenderType\"=\"Transparent\"}";
		catTags = "Tags { \"Queue\"=\"Transparent\"}";
		zWriteString = "ZWrite Off";
		deferredParams = "exclude_path:prepass";
		return;
	}
	EditorUtility.DisplayDialog ("", "Could not set blening mode \""+mode+"\"", "Ok");
}

function SetShaderModel(sm:String) {
	smString = sm;
}

function IsNodeSelected(node:MaterialNode):boolean {
	for (i = 0; i < selectedNodes.length; i++) {
		if (selectedNodes[i] == node) return true;
	}
	return false;
}

function DoesNodeExist(node:MaterialNode):boolean {
	for (i = 0; i < nodes.length; i++) {
		if (nodes[i] == node) return true;
	}
	return false;
}

function updateNodesWithoutMaster() {
	nodesWithoutMaster = new Array();
	for (i = 0; i < nodes.length; i++) {
		if (nodes[i] != masterNode)
			nodesWithoutMaster.Add(nodes[i]);
	}
}

function MouseInUI() {
	if (mousePosition.y < 15) {
		return true;
	}
	if (mousePosition.x >= inspectorRect.x && 
		mousePosition.y >= inspectorRect.y &&
		mousePosition.x <= inspectorRect.x+inspectorRect.width &&
		mousePosition.y <= inspectorRect.y+inspectorRect.height){
		return true;
	}
	if (mousePosition.x < 120){
		return true;
	}
	return false;
}

function MakeNodeWithName(nodeName:String) {
	for (i = 0; i < nodeTypes.length; i++) {
		if (nodeTypeDummys[i].title == nodeName) {
			newNode = nodeTypes[i]();
			newNode.Awake(this);
			nodes.Add(newNode);
			updateNodesWithoutMaster();
			return newNode;
		}
	}
}

function FindNodeWithName(nodeName:String) {
	var theNode:MaterialNode;
	for (i = 0; i < nodes.length; i++) {
		if (nodes[i].title == nodeName) {
			theNode = nodes[i];
		}
	}
	return theNode;
}

function MakeBackground() {
	if (backgroundImage) return;
	backgroundImage = Texture2D(1,1);
	backgroundImage.SetPixel(0,0, bgColor);
	backgroundImage.Apply();
	nodeStyle.normal.background = backgroundImage;
}

function MakeBorder() {
	if (borderImage) return;
	borderImage = Texture2D(1,1);
	borderImage.SetPixel(0,0, borderColor);
	borderImage.Apply();
	nodeBorderStyle.normal.background = borderImage;
}

function MakeSelectedBorder() {
	if (borderSelectedImage) return;
	borderSelectedImage = Texture2D(1,1);
	borderSelectedImage.SetPixel(0,0, borderSelectedColor);
	borderSelectedImage.Apply();
	nodeSelectedBorderStyle.normal.background = borderSelectedImage;
}
function MakeEditorBackgroundStyle() {
	if (editorBackgroundImage) return;
	editorBackgroundImage = Texture2D(1,1);
	editorBackgroundImage.SetPixel(0,0, editorBackgroundColor);
	editorBackgroundImage.Apply();
	editorBackgroundStyle.normal.background = editorBackgroundImage;
}

	function GetLocalDirectory(str:String):String {
		//var start:int = str.LastIndexOf();
		//var end:int = str.LastIndexOf(".");
		//if (str.LastIndexOf("\\") > start) start = str.LastIndexOf("\\");
		return str.Substring(Application.dataPath.length-6);
	}

}
