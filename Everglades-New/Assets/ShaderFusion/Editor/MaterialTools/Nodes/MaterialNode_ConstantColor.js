class MaterialNode_ConstantColor extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "Color";
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	outputs[0].hiddenData = Color(1,1,1,1);
	outputs[0].title = "RGBA";
}

function GenTagInfos() {
	outputs[0].value = "(float4"+outputs[0].GetHiddenValue()+")";
	//tagInfos[0].value += "float4("+outputs[0].value.r+",";
	//tagInfos[0].value += ""+outputs[0].value.g+",";
	//tagInfos[0].value += ""+outputs[0].value.b+",";
	//tagInfos[0].value += ""+outputs[0].value.a+");";
}

}
