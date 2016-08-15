class MaterialNode_SceneDepth extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "SceneDepth";
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("UnlitCGDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	
	outputs[0].value = 1.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	tagInfos[0].onceOnly = true;
	tagInfos[0].value = "sampler2D _CameraDepthTexture;";
	tagInfos[1].onceOnly = true;
	tagInfos[1].value = "float4 screenPos;";
	outputs[0].value = "LinearEyeDepth (tex2Dproj(_CameraDepthTexture, UNITY_PROJ_COORD(IN.screenPos)).r)";
}

}
