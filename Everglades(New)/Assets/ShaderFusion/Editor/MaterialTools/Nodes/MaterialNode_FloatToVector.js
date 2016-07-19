class MaterialNode_FloatToVector extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "Assembler";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("PreFragBody",""));
	
	inputs[0].value = 1.0;
	inputs[1].value = 1.0;
	inputs[2].value = 1.0;
	inputs[3].value = 1.0;
	
	inputs[0].title = "X";
	inputs[1].title = "Y";
	inputs[2].title = "Z";
	inputs[3].title = "W";
	//inputs[0].value = 0.0;
	outputs[0].title = "Out";

}

function GenTagInfos() {
	var floatCount:int = 0;
	var floatString = "float";
	var fx:boolean = false;
	var fy:boolean = false;
	var fz:boolean = false;
	var fw:boolean = false;
	
	if (inputs[0].connections.length > 0) {
		fx = true;
		floatCount += 1;
	}
	if (inputs[1].connections.length > 0) {
		fy = true;
		floatCount += 1;
	}
	if (inputs[2].connections.length > 0) {
		fz = true;
		floatCount += 1;
	}
	if (inputs[3].connections.length > 0) {
		fw = true;
		floatCount += 1;
	}
	
	if (floatCount > 1) {
		floatString += ""+floatCount;
	}
	
	tagInfos[0].value = ""+floatString+" "+shaderTitle+" = "+floatString+"(";
	if (fx){
		tagInfos[0].value += ""+inputs[0].connections[0].value;
		if (fy || fz || fw) tagInfos[0].value += ",";
	}
	if (fy) {
		tagInfos[0].value += ""+inputs[1].connections[0].value;
		if (fz || fw) tagInfos[0].value += ",";
	}
	if (fz) {
		tagInfos[0].value += ""+inputs[2].connections[0].value;
		if (fw) tagInfos[0].value += ",";
	}
	if (fw) {
		tagInfos[0].value += ""+inputs[3].connections[0].value;
	}
	tagInfos[0].value += ");";
	outputs[0].value = "("+shaderTitle+")";
	/*
	outputs[0].value = "("+floatString+"(";
	if (fx){
		outputs[0].value += ""+inputs[0].connections[0].value;
		if (fy || fz || fw) outputs[0].value += ",";
	}
	if (fy) {
		outputs[0].value += ""+inputs[1].connections[0].value;
		if (fz || fw) outputs[0].value += ",";
	}
	if (fz) {
		outputs[0].value += ""+inputs[2].connections[0].value;
		if (fw) outputs[0].value += ",";
	}
	if (fw) {
		outputs[0].value += ""+inputs[1].connections[0].value;
	}
	outputs[0].value += "))";
	*/
}

}
