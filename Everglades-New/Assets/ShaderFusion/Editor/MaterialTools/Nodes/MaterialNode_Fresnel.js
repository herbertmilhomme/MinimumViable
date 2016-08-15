class MaterialNode_Fresnel extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "Fresnel";
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("DeferredVertexBody",""));
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	
	//outputs[0].value = Vector2(1,1);
	outputs[0].title = "Out";
}

function GenTagInfos() {
	//tagInfos[0].onceOnly = true;
	//tagInfos[0].value = "float3 normal;";
	//tagInfos[1].onceOnly = true;
	//tagInfos[1].value = "o.normal = v.normal;";
	tagInfos[0].onceOnly = true;
	tagInfos[0].value = "float3 viewDir;";
	outputs[0].value = "(dot(normalize(IN.viewDir), float4(0.0,0.0,1.0,0.0)))";
}

}
