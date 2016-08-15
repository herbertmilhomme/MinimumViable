
class MaterialShaderGen extends Object {
	var editor:SFMaterialEditor;
	var shaderHeaderAsset:TextAsset;
	var shaderLightingModelAsset:TextAsset;
	var shaderLightingModelAsLines:Array;
	var shaderHeaderAsLines:Array;
	var shaderOutAsLines:Array;
	var currentShader:Shader;
	var currentShaderAsLines:Array;
	var sortedNodes:Array;
	var nodeTagsToWrite:Array;
	var existingTags:Array;
	function MaterialShaderGen(materialEditor:SFMaterialEditor) {
		editor = materialEditor;
		shaderHeaderAsset = AssetDatabase.LoadAssetAtPath(
		"Assets/ShaderFusion/Editor/MaterialTools/ShaderCodeTemplates/DefaultShaderDeferred.txt",TextAsset);
		shaderHeaderAsLines = shaderHeaderAsset.text.Split("\n"[0]);
		shaderOutAsLines = shaderHeaderAsset.text.Split("\n"[0]);
		
		shaderLightingModelAsset = AssetDatabase.LoadAssetAtPath(
		"Assets/ShaderFusion/Editor/MaterialTools/ShaderCodeTemplates/"+"Lighting_Default"+".txt",TextAsset);
		shaderLightingModelAsLines = shaderLightingModelAsset.text.Split("\n"[0]);
	}
	
	function SaveCurrentShader() {
		WriteNodes();
		var file:System.IO.StreamWriter;
		try {
		file = new System.IO.StreamWriter(editor.currentShaderPath as String); 
		}
		catch(err) {
			EditorUtility.DisplayDialog ("", "Invalid shader path. Make sure you have loaded the selected shader in the project window.", "Ok");
			return;
			/*
			editor.currentShaderPath=  EditorUtility.SaveFilePanel("Save a new Shader", "Assets/", "NewShader.shader", "shader");
			
			try {
				file = new System.IO.StreamWriter(editor.currentShaderPath); 
			}
			catch(err) {
				EditorUtility.DisplayDialog ("", "Failed to create file.", "Ok");
				return;
			}
			*/
		}
		for (i = 0; i < shaderOutAsLines.length; i++) {
			shaderOutAsLines[i] = shaderOutAsLines[i].Replace("\n","");
			shaderOutAsLines[i] = shaderOutAsLines[i].Replace("\r","");
			if (shaderOutAsLines[i] != "") {
				file.WriteLine(shaderOutAsLines[i]);
			}
		} 
		file.Close();
		AssetDatabase.ImportAsset(editor.currentShaderPath);
	}
	
	function WriteNodes() {
		editor.updateNodesWithoutMaster();
		
		//all the nodes need update and a unique name.
		for (i = 0; i < editor.nodes.length; i++) {
			if (editor.nodes[i] != editor.masterNode) {
				editor.nodes[i].shaderTitle = "node"+i;
			}
			editor.nodes[i].needsUpdate = true;
			editor.nodes[i].OnProcessNode();
		}
		//Global shader info
		WriteShaderInfo();
		//Begin updating recursively.
		nodeTagsToWrite = new Array();
		existingTags = new Array();
		UpdateNodeRecursive(editor.masterNode);
		//Write the tags from bottom to top.
		for (i = nodeTagsToWrite.length-1; i >= 0; i-=1) {
			//Add the node to the lighting pass
			AddLineAtTag(nodeTagsToWrite[i].tag, nodeTagsToWrite[i].value);
			//Add the node to the unlit pass
			if (!nodeTagsToWrite[i].diffuseOnly) {
				AddLineAtTag("Unlit"+nodeTagsToWrite[i].tag, nodeTagsToWrite[i].value);
			}
		}
		//Write the masterNode's tags.
		for (i = 0; i < editor.masterNode.tagInfos.length; i++) {
			var tagInfo:MaterialNodeTagInfo = editor.masterNode.tagInfos[i];
			AddLineAtTag(tagInfo.tag, tagInfo.value);
		}
		AddLineAtTag("ShaderName","Shader \"ShaderFusion/"+NameFromPath(editor.currentShaderPath)+"\" {");
		
		
		if (editor.deferredMode) {
			for (i = shaderLightingModelAsLines.length-1; i >= 0; i--) {
				AddLineAtTag("LightingModelTag", shaderLightingModelAsLines[i]);
			}
			var outputLightingStr:String;
			outputLightingStr = "#pragma surface surf ShaderFusion vertex:vert ";
			outputLightingStr += editor.deferredParams;
			AddLineAtTag("LightingModelTag", outputLightingStr);
		}
		
		//Save the node info
		WriteNodeInfo();
	}
	
	function UpdateNodeRecursive(node) {
		for (i = 0; i < node.inputs.length; i++) {
			if (node.inputs[i].connections.length > 0) {
				UpdateNodeRecursive(node.inputs[i].connections[0].parent);
			}
		}
		node.GenTagInfos();
		if (node != editor.masterNode && node.needsUpdate) {
			for (j = 0; j < node.tagInfos.length; j++) {
				if (node.tagInfos[j].onceOnly) {
					var exists:boolean = false;
					for (t = 0; t < existingTags.length; t++) {
						if (existingTags[t] == node.tagInfos[j].value) exists = true;
					}
					if (exists) {
						continue;
					}
				}
				existingTags.Add(node.tagInfos[j].value);
				tagInfo = node.tagInfos[j];
				//Add the tags to be inverted and writen later.
				nodeTagsToWrite.Add(tagInfo);
				/*
				//Add the node to the lighting pass
				AddLineAtTag(tagInfo.tag, tagInfo.value);
				//Add the node to the unlit pass
				if (!tagInfo.diffuseOnly) {
					AddLineAtTag("Unlit"+tagInfo.tag, tagInfo.value);
				}
				*/
			}
		}
		node.needsUpdate = false;
	}
	
	function AddTagInfo(tag:MaterialNodeTagInfo) {
		if (tag.onceOnly) {
			var exists:boolean = false;
			for (t = 0; t < existingTags.length; t++) {
				if (existingTags[t] == tag.value) exists = true;
			}
			if (exists) {
				return;
			}
		}
		existingTags.Add(tag.value);
		tagInfo = tag;
		//Add the tags to be inverted and writen later.
		nodeTagsToWrite.Add(tagInfo);
	}
	
	function WriteShaderInfo() {
		var nodeStr:String = "//#";
		nodeStr += "blending="+editor.blendingName;
		AddLineAtTag("EditorFriendly", nodeStr);
		AddLineAtTag("LOD", "LOD "+(0+editor.lodValue));
		//var outputFallbackName = "Transparent/Cutout/VertexLit";
		//if (editor.fallbackName != "" && editor.fallbackName != "Fallback Name") {
			outputFallbackName = editor.fallbackName;
		//}
		AddLineAtTag("Fallback", "Fallback \""+outputFallbackName+"\"");
		if (editor.deferredMode) {
			//BlendingMode
			AddLineAtTag("Blend", editor.deferredBlendingString);
			//ZWrite
			AddLineAtTag("Blend", editor.zWriteString);
			//CatTags
			AddLineAtTag("CatTags", editor.deferredCatTags);
			AddLineAtTag("TargetSM", "#pragma target "+editor.smString);
			//ShaderModel
			AddLineAtTag("EditorFriendly", "//#sm="+editor.smString);
		}
		else {
			//BlendingMode
			AddLineAtTag("Blend", editor.litBlendingString);
			AddLineAtTag("UnlitBlend", editor.unlitBlendingString);
			//ZWrite
			AddLineAtTag("Blend", editor.zWriteString);
			AddLineAtTag("UnlitBlend", editor.zWriteString);
			//CatTags
			AddLineAtTag("CatTags", editor.catTags);
			AddLineAtTag("TargetSM", "#pragma target "+editor.smString);
			//ShaderModel
			AddLineAtTag("UnlitTargetSM", "#pragma target "+editor.smString);
			AddLineAtTag("EditorFriendly", "//#sm="+editor.smString);
		}
	}
	
	function WriteNodeInfo() {
		for (i = 0; i < editor.nodes.length; i++) {
			var nodeStr:String = "//#"+editor.nodes[i].shaderTitle+":";
			nodeStr += "posx="+UnlocalFloat(editor.nodes[i].position.x)+":";
			nodeStr += "posy="+UnlocalFloat(editor.nodes[i].position.y)+":";
			nodeStr += "title="+editor.nodes[i].title+":";
			if (editor.nodes[i].title2 != null) {
				nodeStr += "title2="+editor.nodes[i].title2+":";
			}
			if (editor.nodes[i].inputs.length == 0) {
				for (j = 0; j < editor.nodes[i].outputs.length; j++) {
					if (editor.nodes[i].outputs[j].hiddenData != null) {
						var outValue;
						outValue = editor.nodes[i].outputs[j].hiddenData;
						
						if (outValue instanceof float)
							nodeStr += "input"+j+"="+UnlocalFloat(outValue)+":";
						else if (outValue instanceof Vector2)
							nodeStr += "input"+j+"=("+UnlocalFloat(outValue[0])+","+UnlocalFloat(outValue[1])+"):";
						else if (outValue instanceof Vector3)
							nodeStr += "input"+j+"=("+UnlocalFloat(outValue[0])+","+UnlocalFloat(outValue[1])+","+UnlocalFloat(outValue[2])+"):";
						else if (outValue instanceof Vector4 || outValue instanceof Color)
							nodeStr += "input"+j+"=("+UnlocalFloat(outValue[0])+","+UnlocalFloat(outValue[1])+","+UnlocalFloat(outValue[2])+","+UnlocalFloat(outValue[3])+"):";
						
						if (outValue instanceof float)
							nodeStr += "input"+j+"type=float:";
						else if (outValue instanceof Vector2)
							nodeStr += "input"+j+"type=Vector2:";
						else if (outValue instanceof Vector3)
							nodeStr += "input"+j+"type=Vector3:";
						else if (outValue instanceof Vector4)
							nodeStr += "input"+j+"type=Vector4:";
						else if (outValue instanceof Color)
							nodeStr += "input"+j+"type=Color:";
					}
				}
			}
			for (j = 0; j < editor.nodes[i].inputs.length; j++) {
				if (editor.nodes[i].inputs[j].value != null || editor.nodes[i].inputs[j].hiddenData != null){
					if (editor.nodes[i].inputs[j].hiddenData != null)
						outValue = editor.nodes[i].inputs[j].hiddenData;
					else
						outValue = editor.nodes[i].inputs[j].value;
					
					if (outValue instanceof float)
						nodeStr += "input"+j+"="+UnlocalFloat(outValue)+":";
					else if (outValue instanceof Vector2)
						nodeStr += "input"+j+"=("+UnlocalFloat(outValue[0])+","+UnlocalFloat(outValue[1])+"):";
					else if (outValue instanceof Vector3)
						nodeStr += "input"+j+"=("+UnlocalFloat(outValue[0])+","+UnlocalFloat(outValue[1])+","+UnlocalFloat(outValue[2])+"):";
					else if (outValue instanceof Vector4 || outValue instanceof Color)
						nodeStr += "input"+j+"=("+UnlocalFloat(outValue[0])+","+UnlocalFloat(outValue[1])+","+UnlocalFloat(outValue[2])+","+UnlocalFloat(outValue[3])+"):";
					if (outValue instanceof float)
						nodeStr += "input"+j+"type=float:";
					else if (outValue instanceof Vector2)
						nodeStr += "input"+j+"type=Vector2:";
					else if (outValue instanceof Vector3)
						nodeStr += "input"+j+"type=Vector3:";
					else if (outValue instanceof Vector4)
						nodeStr += "input"+j+"type=Vector4:";
					else if (outValue instanceof Color)
						nodeStr += "input"+j+"type=Color:";
					if (editor.nodes[i].inputs.length > 0) {
						if (editor.nodes[i].inputs[j].connections.length > 0) {
						nodeStr += "input"+j+"linkindexnode="+IndexOfElement(editor.nodes, editor.nodes[i].inputs[j].connections[0].parent)+":";
						nodeStr += "input"+j+"linkindexoutput="+IndexOfElement(editor.nodes[i].inputs[j].connections[0].parent.outputs, editor.nodes[i].inputs[j])+":";
						}
					}
				}
			}
			AddLineAtTag("EditorFriendly", nodeStr);
		}
	}
	
	function LoadNodeInfo() {

		var currentShaderText:TextAsset;
		AssetDatabase.CopyAsset(editor.currentShaderPath, editor.currentShaderPath+".txt");
		AssetDatabase.ImportAsset(editor.currentShaderPath+".txt");
		currentShaderText = AssetDatabase.LoadAssetAtPath(editor.currentShaderPath+".txt",TextAsset);
		if (currentShaderText == null){
			//EditorUtility.DisplayDialog ("", "Shader path was invalid.", "Ok");
			return;
		}
		currentShaderAsLines = currentShaderText.text.Split("\n"[0]);
		
		//Find global settings
		for (i = 0; i < currentShaderAsLines.length; i++) {
			var globalParamName:String = SubString(currentShaderAsLines[i],3,-1);
			//FIX: on PC the last char must be removed?
			//if (IsPC())
			//	globalParamName = SubString(globalParamName,0,globalParamName.length-1);
			//globalParamName = SubString(globalParamName,0,globalParamName.length);
			if (GetPropName(globalParamName) == "blending") {
				editor.SetBlendingMode(GetValue(globalParamName));
			}
			if (GetPropName(globalParamName) == "sm") {
				editor.SetShaderModel(GetValue(globalParamName));
			}
		}
		
		var currentNode:int = 0;
		while(true) {
			var found:boolean = false;
			for (i = 0; i < currentShaderAsLines.length; i++) {
				var nodeDecToLookFor:String = "//#node"+currentNode+":";
				if (currentNode == 0) {
					nodeDecToLookFor = "//#masterNode:";
				}
				var nodeCodeLength:int = (nodeDecToLookFor).length;
				
				if (currentShaderAsLines[i].length >= nodeCodeLength && 
					currentShaderAsLines[i].Substring(0,nodeCodeLength) == nodeDecToLookFor) {
					var nodeIndex:int;
					if (currentNode == 0) nodeIndex = 0;
					else
					nodeIndex = currentNode;
					//nodeIndex = parseInt(currentShaderAsLines[i].Substring(8,nodeCodeLength-8));
					var nodeTitle:String = "";
					var nodeTitle2:String = null;
					var nodePos:Vector2;
					var nodeInputConnections:Array = new Array();
					var newNode;
					var valuesAsStrings:Array = currentShaderAsLines[i].Split(":"[0]);
					for (j = 0; j < valuesAsStrings.length; j++) {
						var thisStringVal:String = valuesAsStrings[j];
						if (GetPropName(thisStringVal) == "posx") {
							nodePos.x = float.Parse(GetValue(thisStringVal),System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
						}
						if (GetPropName(thisStringVal) == "posy") {
							nodePos.y =  float.Parse(GetValue(thisStringVal),System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
						}
						if (GetPropName(thisStringVal) == "title") {
							nodeTitle =  GetValue(thisStringVal);
						}
						if (GetPropName(thisStringVal) == "title2") {
							nodeTitle2 =  GetValue(thisStringVal);
						}
					}
					found = true;
					if (currentNode == 0)
						newNode = editor.masterNode;
					else
						newNode = editor.MakeNodeWithName(nodeTitle);
					//EditorUtility.DisplayDialog ("", ""+nodeTitle, "Ok");
					//EditorUtility.DisplayDialog ("", ""+nodeIndex, "Ok");
					//EditorUtility.DisplayDialog ("", ""+nodePos, "Ok");
					newNode.position.x = nodePos.x;
					newNode.position.y = nodePos.y;
					newNode.nodeIndex = nodeIndex;
					if (nodeTitle2 != null) {
						newNode.title2 = nodeTitle2;
					}
					
					//Hidden data
					for (j = 0; j < newNode.outputs.length; j++) {
						var inputType:String = "";
						if (newNode.outputs[j].hiddenData == null) continue;
						for (k = 0; k < valuesAsStrings.length; k++) {
							valuesAsStrings[k] = valuesAsStrings[k].Replace("(","");
							valuesAsStrings[k] = valuesAsStrings[k].Replace(")","");
							valuesAsStrings[k] = valuesAsStrings[k].Replace(" ","");
							thisStringVal = valuesAsStrings[k];
							if (GetPropName(thisStringVal) == "input"+j+"type") {
								inputType = GetValue(thisStringVal);
							}
						}
						for (k = 0; k < valuesAsStrings.length; k++) {
							thisStringVal = valuesAsStrings[k];
							if (GetPropName(thisStringVal) == "input"+j) {
								if (inputType == "float") {
									newNode.outputs[j].hiddenData = float.Parse(GetValue(thisStringVal),System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
								}
								if (inputType == "Vector2" || inputType == "Vector3" ||
									inputType == "Vector4" || inputType == "Color") {
									var vectorElements:Array = GetValue(thisStringVal).Split(","[0]);
									for (l = 0; l < vectorElements.length; l++) {
										newNode.outputs[j].hiddenData[l] = float.Parse(GetValue(vectorElements[l]),System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
									}
								}
							}
						}
					}
					
					//Normal data
					for (j = 0; j < newNode.inputs.length; j++) {
						inputType = "";
						for (k = 0; k < valuesAsStrings.length; k++) {
							valuesAsStrings[k] = valuesAsStrings[k].Replace("(","");
							valuesAsStrings[k] = valuesAsStrings[k].Replace(")","");
							valuesAsStrings[k] = valuesAsStrings[k].Replace(" ","");
							thisStringVal = valuesAsStrings[k];
							if (GetPropName(thisStringVal) == "input"+j+"type") {
								inputType = GetValue(thisStringVal);
							}
							if (GetPropName(thisStringVal) == ("input"+j+"linkindexnode")) {
								newNode.inputs[j].linkIndex.x = parseInt(GetValue(thisStringVal));
							}
							if (GetPropName(thisStringVal) == ("input"+j+"linkindexoutput")) {
								newNode.inputs[j].linkIndex.y = parseInt(GetValue(thisStringVal));
							}
						}
						for (k = 0; k < valuesAsStrings.length; k++) {
							thisStringVal = valuesAsStrings[k];
							if (GetPropName(thisStringVal) == "input"+j) {
								if (inputType == "float") {
									newNode.inputs[j].value = float.Parse(GetValue(thisStringVal),System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
								}
								if (inputType == "Vector2" || inputType == "Vector3" ||
									inputType == "Vector4" || inputType == "Color") {
									vectorElements = GetValue(thisStringVal).Split(","[0]);
									for (l = 0; l < vectorElements.length; l++) {
										newNode.inputs[j].value[l] = float.Parse(GetValue(vectorElements[l]),System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
									}
								}
							}
						}
					}
					
				}//End If is node info
			}//End Shader Lines
			
			if (!found) break;
			currentNode += 1;
		}//End node loop
		
		//Delete the temp file
		AssetDatabase.DeleteAsset(editor.currentShaderPath+".txt");
		
		//Setup node links;
		for (i = 0; i < editor.nodes.length; i++) {
			for (j = 0; j < editor.nodes[i].inputs.length; j++) {
				if (editor.nodes[i].inputs[j].linkIndex.x  == -1 || editor.nodes[i].inputs[j].linkIndex.y == -1)
					continue;
				var thisInput = editor.nodes[i].inputs[j];
				var otherOutput = editor.nodes[thisInput.linkIndex.x].outputs[thisInput.linkIndex.y];
				thisInput.connections.Add(otherOutput);
				otherOutput.connections.Add(thisInput);
			}
		}
	}
	
	function UnlocalFloat(f:float):String {
		return f.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
	}
	
	function ReadUnlocalFloat(s:String):float {
		return float.Parse(s,System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
	}
	
	function GetPropName(str:String) {
		var pos:int = str.IndexOf("=");
		return SubString(str, 0,pos);
	}
	
	function GetValue(str:String) {
		var pos:int = str.IndexOf("=");
		return SubString(str, pos+1,-1);
	}
	
	function SubString(str:String, start:int, end:int):String {
		var outStr:String = "";
		if (start > str.length) start = str.length;
		if (end < start) end = str.length;
		if (end > str.length) end = str.length;
		for (i = start; i < end; i++) {
			outStr += str[i];
		}
		return outStr;
	}
	
	function NameFromPath(str:String) {
		var start:int = str.LastIndexOf("/");
		var end:int = str.LastIndexOf(".");
		if (str.LastIndexOf("\\") > start) start = str.LastIndexOf("\\");
		return SubString(str, start+1,end);
	}
	
	function AddLineAtTag(tag:String, str:String) {
		//Debug.Log(tag);
		p = GetTagPos(tag);
		if (p != null)
			AddLineAtPos(p, str);
		//else 
		//	EditorUtility.DisplayDialog ("Node Tag Error", "The tag was not found.\n"+tag, "Ok");
	}
	
	function AddLineAtPos(pos:int, str:String) {
		shaderOutAsLines = ArrayInsert(shaderOutAsLines, Mathf.Min(pos+1, shaderOutAsLines.length-1), str);
	}
	
	function GetTagPos(tag:String) {
		for (i = 0; i < shaderOutAsLines.length; i++) {
			if (shaderOutAsLines[i] == "//#"+tag) {
				return i;
			}
		}
		return null;
	}
	
	function PosInArray(theArray:Array, value) {
		for (i = 0; i < theArray.length; i++) {
			if (theArray[i] == value) {
				return i;
			}
		}
		return null;
	}
	
	function ArrayInsert(theArray:Array, pos:int, value):Array {
		var ta:Array = new Array();
		for (i = 0; i < theArray.length; i++) {
			if (i == pos) {
				ta.Add(value);
			}
			ta.Add(theArray[i]);
		}
		return ta;
		//array.Clear();
		//for (i = 0; i < ta.length; i++) {
		//	array.Add(ta[i]);
		//}
	}
	
	function IndexOfElement(theArray:Array,value):int {
		for (i = 0; i < theArray.length; i++) {
			if (theArray[i] == value) return i;
		}
	}
	
	function IsPC():boolean {
		var state:boolean = false;
		if (Application.platform == RuntimePlatform.WindowsPlayer) state = true;
		if (Application.platform == RuntimePlatform.WindowsWebPlayer) state = true;
		if (Application.platform == RuntimePlatform.WindowsEditor) state = true;
		return state;
	}
	
}
