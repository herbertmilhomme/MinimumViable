class MaterialNode_PlaneReflection extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	//SetIcon("TextureIcon01.psd");
	noOutputText = true;
	title = "PlaneReflectUV";
	
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("DeferredVertexBody",""));
	
	outputs[0].title = "XYZW";
	
	var foundTextureNodes:int = 0;
	for (i = 0; i < editor.nodes.length; i++) {
		if (editor.nodes[i].title == title) {
			foundTextureNodes += 1;
		}
	}
	title2 = title+(foundTextureNodes+1);
	
}

function GenTagInfos() {
	tagInfos[0].onceOnly = true;
	tagInfos[0].value = "float4 planeReflectionUV;";
	
	tagInfos[1].onceOnly = true;
	tagInfos[1].value = "o.planeReflectionUV = ComputeScreenPos(mul(UNITY_MATRIX_MVP, v.vertex));";
	
	outputs[0].value = "("+"IN.planeReflectionUV.xy/IN.planeReflectionUV.w"+")";
}

}