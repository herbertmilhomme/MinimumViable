class MaterialNode_SceneColor extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "SceneColor";
	
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("UnlitCGDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("UnlitCGDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("GrabPass",""));
	tagInfos.Add(new MaterialNodeTagInfo("PreFragBody",""));
	
	inputs[0].title = "Offset";
	inputs[0].value = Vector2(0,0);
	outputs[0].value = 1.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {

	tagInfos[0].onceOnly = true;
	tagInfos[0].value = "sampler2D _GrabTexture;";
	tagInfos[1].onceOnly = true;
	tagInfos[1].value = "float4 _GrabTexture_TexelSize;";
	tagInfos[2].onceOnly = true;
	tagInfos[2].value = "float4 screenPos;";
	tagInfos[3].onceOnly = true;
	tagInfos[3].value = "GrabPass { }";
	tagInfos[4].value = "float4 __sceneColor_"+shaderTitle+" = ";
	tagInfos[4].value += "(tex2D(_GrabTexture,((IN.screenPos.xy/IN.screenPos.w)+((";
	tagInfos[4].value += InputValue(0);
	tagInfos[4].value += ")*(IN.screenPos.z*_GrabTexture_TexelSize.xy)))));";
	outputs[0].value = "(__sceneColor_"+shaderTitle+")";
	//outputs[0].value = "(tex2D(_GrabTexture,((IN.screenPos.xy/IN.screenPos.w)+((";
	//outputs[0].value += InputValue(0);
	//outputs[0].value += ")*(IN.screenPos.z*_GrabTexture_TexelSize.xy)))))";
}

}
