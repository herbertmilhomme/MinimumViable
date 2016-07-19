class MaterialNode_SurfaceNormal extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "SurfaceNormal";
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("DeferredVertexBody",""));
	
	outputs[0].value = Vector3(0,0,0);
	outputs[0].title = "XYZ";
}

function GenTagInfos() {
	tagInfos[0].onceOnly = true;
	tagInfos[0].value = "float3 normal;";
	tagInfos[1].onceOnly = true;
	tagInfos[1].value = "o.normal = v.normal;";
	outputs[0].value = "(float4(IN.normal,1))";
}

}
