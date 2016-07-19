class MaterialNode_DepthBlend extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "DepthBlend";
	
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("UnlitCGDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("PreFragBody",""));
	
	inputs[0].title = "Dist";
	inputs[0].value = 0.25;
	outputs[0].value = 1.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	tagInfos[0].onceOnly = true;
	tagInfos[0].value = "sampler2D _CameraDepthTexture;";
	tagInfos[1].onceOnly = true;
	tagInfos[1].value = "float4 screenPos;";
	tagInfos[2].value = "float "+shaderTitle+" = ";
	tagInfos[2].value += "((LinearEyeDepth(tex2Dproj(_CameraDepthTexture, UNITY_PROJ_COORD(IN.screenPos)).r)-IN.screenPos.z)/";
	tagInfos[2].value += InputValue(0);
	tagInfos[2].value += ");";
	outputs[0].value = "("+shaderTitle+")";
	//outputs[0].value = "((LinearEyeDepth(tex2Dproj(_CameraDepthTexture, UNITY_PROJ_COORD(IN.screenPos)).r)-IN.screenPos.z)/";
	//outputs[0].value += InputValue(0);
	//outputs[0].value += ")";
}

}
