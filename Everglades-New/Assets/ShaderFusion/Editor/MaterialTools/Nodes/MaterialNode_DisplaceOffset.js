class MaterialNode_DisplaceOffset extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "DisplaceOffset";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	
	inputs[0].title = "Height";
	inputs[1].title = "Amount";
	inputs[2].title = "Dir";
	inputs[0].value = 0.5;
	inputs[1].value = 0.1;
	inputs[2].value = "IN.viewDir";
	outputs[0].title = "Out";
}

function GenTagInfos() {
	tagInfos[0].onceOnly = true;
	tagInfos[0].value = "float3 viewDir;";
	outputs[0].value = "(ParallaxOffset(";
	outputs[0].value += InputValue(0);
	outputs[0].value += ", ";
	outputs[0].value += InputValue(1);
	outputs[0].value += ", ";
	outputs[0].value += InputValueOrThis(2,"IN.viewDir");
	outputs[0].value += "))";
	
}

}
