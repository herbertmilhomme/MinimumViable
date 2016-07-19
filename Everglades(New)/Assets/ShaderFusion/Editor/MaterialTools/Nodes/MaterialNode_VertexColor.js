class MaterialNode_VertexColor extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "VertexColor";
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("DeferredVertexBody",""));
	
	outputs[0].value = 1.0;
	outputs[0].title = "RGBA";
}

function GenTagInfos() {
	tagInfos[0].onceOnly = true;
	tagInfos[0].value = "float4 COLOR;";
	tagInfos[1].onceOnly = true;
	tagInfos[1].value = "o.COLOR = v.color;";
	outputs[0].value = "(IN.COLOR)";
}

}
