class MaterialNode_InterlaceAlpha extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "InterlaceAlpha";
	outputs.Add(new MaterialNodeSocket(this));
	size.x *= 1.16;
	inputs.Add(new MaterialNodeSocket(this));
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("UnlitCGDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("UnlitCGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("UnlitCGDefs",""));
	
	inputs[0].title = "In";
	inputs[0].value = 1.0;
	
	outputs[0].value = 1.0;
	outputs[0].title = "Out";
}

function OnCreateNode() {
	EditorUtility.DisplayDialog("Warning","This node requires that you have a \"ShaderGlobalScreenSize\" component applied to a GameObject in your scene.","Ok");
}

function GenTagInfos() {
	tagInfos[0].onceOnly = true;
	tagInfos[0].value = "float4 screenPos;";
	tagInfos[1].onceOnly = true;
	tagInfos[1].value = "float4 _ScreenSize;";
	tagInfos[2].onceOnly = true;
	tagInfos[2].value = "sampler2D _InterlaceAlphaLookupTex;";
	//tagInfos[3].onceOnly = true;
	//tagInfos[3].value = "float4 _GrabTexture_TexelSize;";
	var outString:String = "";
	
	outString = "lerp(((tex2D(_InterlaceAlphaLookupTex,(((((float4((IN.screenPos/IN.screenPos.w).xyz,IN.screenPos.w)).xy))*(_ScreenSize.xy)) / 4))) * (%)),(float4(1,1,1,1)),(%))";
	//outString = "lerp(((tex2D(_InterlaceAlphaLookupTex,(((((float4((IN.screenPos/IN.screenPos.w).xyz,IN.screenPos.w)).xy))/(_GrabTexture_TexelSize.xy)) * 0.25))) * (%)),(float4(1,1,1,1)),(%))";
	var inputStr:String = "";
	if (inputs[0].connections.length > 0)
		inputStr += ""+inputs[0].connections[0].value;
	else 
		inputStr += ""+inputs[0].GetValue();
	
	outString = outString.Replace("%", inputStr);
	outString = outString.Replace("%", inputStr);
	outString = outString.Replace("%", inputStr);
	outString = outString.Replace("%", inputStr);
	
	outputs[0].value = "("+outString+")";
}

}
