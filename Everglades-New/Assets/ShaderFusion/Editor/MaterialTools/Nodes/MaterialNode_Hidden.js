class MaterialNode_Hidden_DoubleSided extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "DoubleSided";
	hidden = true;
}

function GenTagInfos() {

}

function OnProcessNode() {
	editor.shaderGen.AddLineAtTag("CatTags","Cull "+title2);
	if (title2 == "Front") {
		editor.shaderGen.AddLineAtTag("DeferredVertexEnd","v.normal = -v.normal;");
	}
	//if (title2 == "Off") {
	//	var flipNormalStr:String = "float normalSign = sign(mul(UNITY_MATRIX_MVP,float4(v.normal,0)).z+0.005); v.normal = lerp(-v.normal,v.normal,max(normalSign,0));";
	//	editor.shaderGen.AddLineAtTag("DeferredVertexEnd",flipNormalStr);
	//}
}

}


class MaterialNode_Hidden_FallbackInfo extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "FallbackInfo";
	hidden = true;
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	outputs[0].hiddenData = 1.0;
	outputs[0].title = "Out";
	
	title2 = "Fallback Name";
}

function GenTagInfos() {
	outputs[0].value = "FAIIILLLLLL!!!";
}

}


class MaterialNode_Hidden_Lighting extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "Lighting";
	hidden = true;
}

function GenTagInfos() {

}

function OnProcessNode() {
	editor.shaderGen.AddLineAtTag("CatTags","Lighting "+title2);
}

}


class MaterialNode_Hidden_LODInfo extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "LODInfo";
	hidden = true;
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	//tagInfos.Add(new MaterialNodeTagInfo("FragBody",""));
	
	outputs[0].hiddenData = 1.0;
	outputs[0].title = "Out";
	
	var foundNodes:int = 0;
	for (i = 0; i < editor.nodes.length; i++) {
		if (editor.nodes[i].title == title) {
			foundNodes += 1;
		}
	}
	title2 = title+(foundNodes+1);
}

function GenTagInfos() {
	outputs[0].value = "FAIIILLLLLL!!!";
}

}
