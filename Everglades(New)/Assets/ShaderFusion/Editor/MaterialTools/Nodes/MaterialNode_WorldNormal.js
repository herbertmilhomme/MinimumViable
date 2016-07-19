class MaterialNode_WorldNormal extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "WorldNormal";
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("DeferredVertexBody",""));
	
	outputs[0].value = Vector3(0,0,0);
	outputs[0].title = "XYZ";
}

function GenTagInfos() {
	tagInfos[0].onceOnly = true;
	tagInfos[0].value = "float3 worldNormal;";
	tagInfos[1].onceOnly = true;
	tagInfos[1].value = "o.worldNormal = mul((float3x3)_Object2World,v.normal);";
	outputs[0].value = "(IN.worldNormal)";
}

}
