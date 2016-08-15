class MaterialNode_Master extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	drawPreview = false;
	selectable = false;
	size.x *= 1.5;
	title = "Master Node";
	shaderTitle = "masterNode";
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	//inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	inputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	inputs[0].value =1;
	inputs[1].value =1;
	inputs[2].value =1;
	inputs[3].value =1;
	//inputs[4].value =1;
	inputs[4].value =1;
	inputs[5].value =1;
	
	inputs[0].title = "Diffuse";
	inputs[1].title = "Emissive";
	inputs[2].title = "Specular";
	inputs[3].title = "Glossiness";
	//inputs[4].title = "LitAlphaMask";
	inputs[4].title = "AlphaMask";
	inputs[5].title = "Normal";
}

function GenTagInfos() {
	tagInfos[0].value = "";
	tagInfos[1].value = "";
	tagInfos[2].value = "";
	tagInfos[3].value = "";
	//tagInfos[4].value = "";
	tagInfos[4].value = "";
	tagInfos[5].value = "";
	if (inputs[0].connections.length > 0) {
		tagInfos[0].value = "diffuse = "+inputs[0].connections[0].value+";";
	}
	
	if (inputs[1].connections.length > 0) {
		tagInfos[1].value = "emissive = "+inputs[1].connections[0].value+";";
	}
	if (inputs[2].connections.length > 0) {
		tagInfos[2].value = "specular = "+inputs[2].connections[0].value+";";
	}
	if (inputs[3].connections.length > 0) {
		tagInfos[3].value = "gloss = "+inputs[3].connections[0].value+";";
	}
	//if (inputs[4].connections.length > 0) {
	//	tagInfos[4].value = "alphaMask = "+inputs[4].connections[0].value+";";
	//}
	if (inputs[4].connections.length > 0) {
		tagInfos[4].value = "alpha = "+inputs[4].connections[0].value+";";
	}
	if (inputs[5].connections.length > 0) {
		tagInfos[5].value = "normal = "+inputs[5].connections[0].value+";";
	}
}

}
