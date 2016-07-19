class MaterialNode_ScreenPos extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "ScreenPos";
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	
	outputs[0].value = 1.0;
	outputs[0].title = "XYZW";
}

function GenTagInfos() {
	tagInfos[0].onceOnly = true;
	tagInfos[0].value = "float4 screenPos;";
	outputs[0].value = "(IN.screenPos)";
}

}
