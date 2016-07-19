class MaterialNode_ElementOf extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "ElementOf";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "In";
	inputs[1].title = "Index";
	inputs[0].value = Vector4(0,0,0,0);
	inputs[1].value = 0;
	outputs[0].title = "Out";

}

function GenTagInfos() {
	outputs[0].value = "(";
	if (inputs[0].connections.length > 0) {
		outputs[0].value += ""+inputs[0].connections[0].value;
		outputs[0].value += "["+inputs[1].GetValue()+"]";
	}
	else 
		outputs[0].value += "0.0";
	outputs[0].value += ")";
}

}
