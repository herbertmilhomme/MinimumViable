class MaterialNode_Add extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("AddIcon01.psd");
	noOutputText = true;
	title = "Add";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "A";
	inputs[1].title = "B";
	inputs[0].value = 0.0;
	inputs[1].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += " + ";
	if (inputs[1].connections.length > 0)
		outputs[0].value += ""+inputs[1].connections[0].value;
	else 
		outputs[0].value += ""+inputs[1].GetValue();
	outputs[0].value += ")";
	
}

}

class MaterialNode_Abs extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "Abs";
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "In";
	inputs[0].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(abs(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += "))";
	
}

}


class MaterialNode_Ceil extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "Ceil";
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "In";
	inputs[0].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(ceil(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += "))";
	
}

}


class MaterialNode_Clamp extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "Clamp";
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "In";
	inputs[0].value = Vector4(1,1,1,1);
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(saturate(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += "))";
	
}

}


class MaterialNode_Cosine extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "Cosine";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "In";
	inputs[0].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(cos(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += "))";
}

}


class MaterialNode_Cross extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "CrossProduct";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "A";
	inputs[1].title = "B";
	inputs[0].value = 0.0;
	inputs[1].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(cross(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += ",";
	if (inputs[1].connections.length > 0)
		outputs[0].value += ""+inputs[1].connections[0].value;
	else 
		outputs[0].value += ""+inputs[1].GetValue();
	outputs[0].value += "))";
	
}

}


class MaterialNode_Divide extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("DivideIcon01.psd");
	noOutputText = true;
	title = "Divide";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "A";
	inputs[1].title = "B";
	inputs[0].value = 1.0;
	inputs[1].value = 1.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += " / ";
	if (inputs[1].connections.length > 0)
		outputs[0].value += ""+inputs[1].connections[0].value;
	else 
		outputs[0].value += ""+inputs[1].GetValue();
	outputs[0].value += ")";
	
}

}


class MaterialNode_Distance extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "Distance";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "A";
	inputs[1].title = "B";
	inputs[0].value = 0.0;
	inputs[1].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(distance(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += ", ";
	if (inputs[1].connections.length > 0)
		outputs[0].value += ""+inputs[1].connections[0].value;
	else 
		outputs[0].value += ""+inputs[1].GetValue();
	outputs[0].value += "))";
	
}

}


class MaterialNode_Dot extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "DotProduct";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "A";
	inputs[1].title = "B";
	inputs[0].value = 0.0;
	inputs[1].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(dot(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += ",";
	if (inputs[1].connections.length > 0)
		outputs[0].value += ""+inputs[1].connections[0].value;
	else 
		outputs[0].value += ""+inputs[1].GetValue();
	outputs[0].value += "))";
	
}

}

class MaterialNode_Floor extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "Floor";
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "In";
	inputs[0].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(floor(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += "))";
	
}

}


class MaterialNode_Fmod extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "Fmod";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "A";
	inputs[1].title = "B";
	inputs[0].value = 0.0;
	inputs[1].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(fmod(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += ",";
	if (inputs[1].connections.length > 0)
		outputs[0].value += ""+inputs[1].connections[0].value;
	else 
		outputs[0].value += ""+inputs[1].GetValue();
	outputs[0].value += "))";
	
}

}


class MaterialNode_Frac extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "Frac";
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "In";
	inputs[0].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(frac(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += "))";
}

}


class MaterialNode_Highest extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "Highest";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "A";
	inputs[1].title = "B";
	inputs[0].value = 0.0;
	inputs[1].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(max(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += ",";
	if (inputs[1].connections.length > 0)
		outputs[0].value += ""+inputs[1].connections[0].value;
	else 
		outputs[0].value += ""+inputs[1].GetValue();
	outputs[0].value += "))";
	
}

}


class MaterialNode_Interpolate extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "Lerp";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "A";
	inputs[1].title = "B";
	inputs[2].title = "Value";
	inputs[0].value = Vector4(0,0,0,0);
	inputs[1].value = Vector4(0,0,0,0);
	inputs[2].value = 0.5;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	/*
	outputs[0].value = "((";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	if (inputs[2].connections.length > 0)
		outputs[0].value += "*min(max(1.0-"+inputs[2].connections[0].value+",0.00000001),1.0)+(";
	else 
		outputs[0].value += "*min(max(1.0-"+inputs[2].GetValue()+",0.00000001),1.0)+(";
	if (inputs[1].connections.length > 0)
		outputs[0].value += ""+inputs[1].connections[0].value;
	else 
		outputs[0].value += ""+inputs[1].GetValue();
	if (inputs[2].connections.length > 0)
		outputs[0].value += "*min(max("+inputs[2].connections[0].value+",0.00000001),1.0))))";
	else 
		outputs[0].value += "*min(max("+inputs[2].GetValue()+",0.00000001),1.0))))";
	//outputs[0].value += "*"+inputs[2].value+")*0.5))";
	*/
	outputs[0].value = "(lerp(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += ",";
	
	if (inputs[1].connections.length > 0)
		outputs[0].value += ""+inputs[1].connections[0].value;
	else
		outputs[0].value += ""+inputs[1].GetValue();
	outputs[0].value += ",";
	
	if (inputs[2].connections.length > 0)
		outputs[0].value += ""+inputs[2].connections[0].value;
	else
		outputs[0].value += ""+inputs[2].GetValue();
	outputs[0].value += "))";
}

}


class MaterialNode_Lowest extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "Lowest";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "A";
	inputs[1].title = "B";
	inputs[0].value = 0.0;
	inputs[1].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(min(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += ",";
	if (inputs[1].connections.length > 0)
		outputs[0].value += ""+inputs[1].connections[0].value;
	else 
		outputs[0].value += ""+inputs[1].GetValue();
	outputs[0].value += "))";
	
}

}


class MaterialNode_Multiply extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MultiplyIcon01.psd");
	noOutputText = true;
	title = "Multiply";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	inputs[0].title = "A";
	inputs[1].title = "B";
	inputs[0].value = 1.0;
	inputs[1].value = 1.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(";
	outputs[0].value += InputValue(0);
	outputs[0].value += " * ";
	outputs[0].value += InputValue(1);
	outputs[0].value += ")";
}

}


class MaterialNode_Normalize extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "Normalize";
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "In";
	inputs[0].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(normalize(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += "))";
	
}

}


class MaterialNode_Power extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "Power";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "In";
	inputs[1].title = "Power";
	inputs[0].value = 0.0;
	inputs[1].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(pow(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += ",";
	if (inputs[1].connections.length > 0)
		outputs[0].value += ""+inputs[1].connections[0].value;
	else 
		outputs[0].value += ""+inputs[1].GetValue();
	outputs[0].value += "))";
	
}

}


class MaterialNode_Reflect extends MaterialNode {
//mul((float3x3)_Object2World, reflect( -viewDir, surfaceNormal ))
function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "Reflection";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	//tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	
	inputs[0].title = "Dir";
	inputs[1].title = "SurfaceNormal";
	inputs[0].value = 0.0;
	inputs[1].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	//tagInfos[0].onceOnly = true;
	//tagInfos[0].value = "float3 worldRefl;";
	outputs[0].value = "WorldReflectionVector(IN, (";
	if (inputs[1].connections.length > 0)
		outputs[0].value += ""+inputs[1].connections[0].value;
	else
		outputs[0].value += "normal";
	outputs[0].value += "))";
	
}

}


class MaterialNode_Sine extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "Sine";
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "In";
	inputs[0].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(sin(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += "))";
}

}


class MaterialNode_Step extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "Step";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "A";
	inputs[1].title = "B";
	inputs[0].value = 1.0;
	inputs[1].value = 1.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(step(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += ", ";
	if (inputs[1].connections.length > 0)
		outputs[0].value += ""+inputs[1].connections[0].value;
	else 
		outputs[0].value += ""+inputs[1].GetValue();
	outputs[0].value += "))";
	
}

}


class MaterialNode_Subtract extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("SubtractIcon01.psd");
	noOutputText = true;
	title = "Subtract";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "A";
	inputs[1].title = "B";
	inputs[0].value = 0.0;
	inputs[1].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += " - ";
	if (inputs[1].connections.length > 0)
		outputs[0].value += ""+inputs[1].connections[0].value;
	else 
		outputs[0].value += ""+inputs[1].GetValue();
	outputs[0].value += ")";
	
}

}


class MaterialNode_SquareRoot extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("MathIcon01.psd");
	noOutputText = true;
	title = "SquareRoot";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	//tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].title = "A";
	inputs[1].title = "B";
	inputs[0].value = 0.0;
	inputs[1].value = 0.0;
	outputs[0].title = "Out";
}

function GenTagInfos() {
	outputs[0].value = "(sqrt(";
	if (inputs[0].connections.length > 0)
		outputs[0].value += ""+inputs[0].connections[0].value;
	else 
		outputs[0].value += ""+inputs[0].GetValue();
	outputs[0].value += ",";
	if (inputs[1].connections.length > 0)
		outputs[0].value += ""+inputs[1].connections[0].value;
	else 
		outputs[0].value += ""+inputs[1].GetValue();
	outputs[0].value += "))";
	
}

}
