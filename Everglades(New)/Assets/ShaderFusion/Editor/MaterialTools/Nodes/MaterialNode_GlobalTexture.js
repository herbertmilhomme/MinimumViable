class MaterialNode_GlobalTexture extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("TextureIcon01.psd");
	noOutputText = true;
	title = "GlobalTexture";
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("PreFragBody",""));
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("DeferredVertexBody",""));
	
	inputs[0].title = "UV";
	inputs[0].value = Vector2(0,0);
	outputs[0].title = "RGBA";
	
	var foundTextureNodes:int = 0;
	for (i = 0; i < editor.nodes.length; i++) {
		if (editor.nodes[i].title == title) {
			foundTextureNodes += 1;
		}
	}
	title2 = title+(foundTextureNodes+1);
	
}

function GenTagInfos() {
	var sharedUVCoords = "sfuv1";
	tagInfos[3].onceOnly = true;
	tagInfos[3].value = "o.sfuv1 = v.texcoord.xy;";
	
	//Def
	tagInfos[0].onceOnly = true;
	tagInfos[0].value = "sampler2D _"+title2+";";
	//FragDec
	tagInfos[1].value = "float4 "+shaderTitle+" = ";
	tagInfos[1].value += "tex2D(_"+title2+",";
	tagInfos[2].onceOnly = true;
	tagInfos[2].value = "float2 sfuv1;";
	if (inputs[0].connections.length > 0) 
		tagInfos[1].value += inputs[0].connections[0].value;
	else
		tagInfos[1].value += "IN.sfuv1";
	tagInfos[1].value += ");";
	
	//Frag
	outputs[0].value = "("+shaderTitle+")";
}

}