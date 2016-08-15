class MaterialNode_UV1 extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "UV1";
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("DeferredVertexBody",""));
	
	outputs[0].value = 1.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	tagInfos[0].onceOnly = true;
	tagInfos[0].value = "float2 sfuv1;";
	
	tagInfos[1].onceOnly = true;
	tagInfos[1].value = "o.sfuv1 = v.texcoord.xy;";
	
	outputs[0].value = "(IN.sfuv1)";
}

}


class MaterialNode_UV2 extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "UV2";
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("DeferredVertexBody",""));
	
	outputs[0].value = 1.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	tagInfos[0].onceOnly = true;
	tagInfos[0].value = "float2 sfuv2;";
	
	tagInfos[1].onceOnly = true;
	tagInfos[1].value = "o.sfuv2 = v.texcoord1.xy;";
	
	outputs[0].value = "(IN.sfuv2)";
}

}
