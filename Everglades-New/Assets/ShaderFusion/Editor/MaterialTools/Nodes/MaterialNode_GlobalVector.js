class MaterialNode_GlobalVector extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	title = "GlobalVector";
	outputs.Add(new MaterialNodeSocket(this));
	
	//tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("UnlitCGDefs",""));
	
	outputs[0].value = Vector4(0,0,0,0);
	outputs[0].title = "Out";
	
	var foundTextureNodes:int = 0;
	for (i = 0; i < editor.nodes.length; i++) {
		if (editor.nodes[i].title == title) {
			foundTextureNodes += 1;
		}
	}
	title2 = title+(foundTextureNodes+1);
}

function GenTagInfos() {
	tagInfos[0].onceOnly = true;
	tagInfos[0].value = "float4 "+title2+";";
	outputs[0].value = "("+title2+")";
}

}
