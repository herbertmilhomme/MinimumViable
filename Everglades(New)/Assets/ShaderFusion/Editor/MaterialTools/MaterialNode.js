
class MaterialNode extends Object {
var editor:SFMaterialEditor;
var title = "Default Material Node";
var title2 = null;
var shaderTitle:String = "shaderTitle";
var position:Vector2;
var size:Vector2 = Vector2(72,72*0.5);
var previewSize:Vector2 = Vector2(64,64);
var previewTex:Texture2D;
var drawPreview:boolean;
var selectable:boolean;
var maxOfThisNode:int = 0;
var dataType:String;
var needsUpdate:boolean = true;
var hidden:boolean = false;
var deprecated:boolean = false;

var iconName:String;
var icon:Texture2D;
var noOutputText:boolean = false;

var nodeIndex:int = -1;

var inputs:Array;
var outputs:Array;

var tagInfos:Array;

function InputValue(index:int):String {
	var str:String = "";
	if (inputs[index].connections.length > 0)
		str += ""+inputs[index].connections[0].value;
	else 
		str += ""+inputs[index].GetValue();
	return str;
}

function InputValueOrThis(index:int, defaultValue:String):String {
	var str:String = "";
	if (inputs[index].connections.length > 0)
		str += ""+inputs[index].connections[0].value;
	else 
		str += defaultValue;
	return str;
}

function Awake(editorWindow:SFMaterialEditor) {
	editor = editorWindow;
	inputs = new Array();
	outputs = new Array();
	tagInfos = new Array();
	drawPreview = false;
	selectable = true;
	defaultDataType = "";
	iconName = "";
	//UpdatePreview();
}

function SetIcon(value:String) {
	iconName = value;
	if (iconName == "") return;
	icon = AssetDatabase.LoadAssetAtPath(
		"Assets/ShaderFusion/Editor/MaterialTools/GUIAssets/Icons/"+iconName,Texture2D);
}

function OnCreateNode() {

}

function UpdatePreview() {
	if (previewTex) Object.DestroyImmediate(previewTex);
	previewTex = Texture2D(previewSize.x,previewSize.y);
	for (x = 0; x < previewTex.width; x++) {
		for (y= 0; y < previewTex.height; y++) {
			previewTex.SetPixel(x,y, Color(parseFloat(x)/previewTex.width, parseFloat(y)/previewTex.height, 0,1));
		}
	}
	previewTex.Apply();
}

function GenTagInfos() {
	super.GenTagInfos();
}

function Gen() {
	super.GenTagInfos();
}

function OnProcessNode() {

}

}
