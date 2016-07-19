class MaterialNode_BakeSpecSwitch extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "BakeSpecSwitch";
}

function GenTagInfos() {

}

function OnProcessNode() {
	editor.shaderGen.AddLineAtTag("UnlitCGDefs","float4 _BakeDownSpecSwitch;");
	editor.shaderGen.AddLineAtTag("FragEnd","o.GlossColor = o.GlossColor*(1.0-_BakeDownSpecSwitch.x)*(1.0-_BakeDownSpecSwitch.y);");
	editor.shaderGen.AddLineAtTag("FragEnd","o.Albedo = lerp(o.Albedo,o.GlossColor*0.5, _BakeDownSpecSwitch.x);");
}

}
