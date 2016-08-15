class MaterialNode_TextureSample extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("TextureIcon01.psd");
	noOutputText = true;
	title = "Texture";
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
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
	tagInfos[4].onceOnly = true;
	tagInfos[4].value = "o.sfuv1 = v.texcoord.xy;";
	
	//Poperty
	tagInfos[0].diffuseOnly = true;
	tagInfos[0].onceOnly = true;
	tagInfos[0].value = "_"+title2+" (\""+title2+"\", 2D) = \"white\" {}";
	//Def
	tagInfos[1].onceOnly = true;
	tagInfos[1].value = "sampler2D _"+title2+";";
	//FragDec
	tagInfos[2].value = "float4 "+shaderTitle+" = ";
	tagInfos[2].value += "tex2D(_"+title2+",";
	tagInfos[3].onceOnly = true;
	tagInfos[3].value = "float2 sfuv1;";
	if (inputs[0].connections.length > 0) 
		tagInfos[2].value += inputs[0].connections[0].value;
	else
		tagInfos[2].value += "IN.sfuv1";
	tagInfos[2].value += ");";
	
	//Frag
	outputs[0].value = "("+shaderTitle+")";
}

}

class MaterialNode_TextureCubeMap extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("TextureIcon01.psd");
	noOutputText = true;
	title = "CubeMap";
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("PreFragBody",""));
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	
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
	//Poperty
	tagInfos[0].diffuseOnly = true;
	tagInfos[0].value = "_"+title2+" (\""+title2+"\", Cube) = \"_Skybox\" { TexGen CubeReflect }";
	//Def
	tagInfos[1].value = "samplerCUBE _"+title2+";";
	//FragDec
	tagInfos[2].value = "float4 "+shaderTitle+" = ";
	tagInfos[2].value += "texCUBE(_"+title2+",";
	tagInfos[3].onceOnly = true;
	tagInfos[3].value = "float3 worldRefl;";
	
	var defaultInput:String = "WorldReflectionVector(IN, ";
	if (inputs[0].connections.length > 0)
		defaultInput += ""+inputs[0].connections[0].value;
	else
		defaultInput += "normal";
	defaultInput += ")";
	
	if (inputs[0].connections.length > 0) 
		tagInfos[2].value += inputs[0].connections[0].value;
	else
		tagInfos[2].value += defaultInput;
	tagInfos[2].value += ");";
	
	//Frag
	outputs[0].value = "("+shaderTitle+")";
}

}

class MaterialNode_TextureWithXForm extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("TextureIcon01.psd");
	noOutputText = true;
	title = "TexWithXform";
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("PreFragBody",""));
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	
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
	//Poperty
	tagInfos[0].diffuseOnly = true;
	tagInfos[0].onceOnly = true;
	tagInfos[0].value = "_"+title2+" (\""+title2+"\", 2D) = \"white\" {}";
	//Def
	tagInfos[1].onceOnly = true;
	tagInfos[1].value = "sampler2D _"+title2+";";
	//FragDec
	tagInfos[2].value = "float4 "+shaderTitle+" = ";
	tagInfos[2].value += "tex2D(_"+title2+",";
	tagInfos[3].value = "float2 uv_"+title2+";";
	tagInfos[3].onceOnly = true;
	if (inputs[0].connections.length > 0) 
		tagInfos[2].value += inputs[0].connections[0].value;
	else
		tagInfos[2].value += "IN.uv_"+title2+".xy";
	tagInfos[2].value += ");";
	
	//Frag
	outputs[0].value = "("+shaderTitle+")";
}

}


class MaterialNode_TextureLightmap extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("TextureIcon01.psd");
	noOutputText = true;
	//hidden = true;
	deprecated = true;
	title = "Lightmap";
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	
	inputs[0].title = "UV";
	inputs[0].value = Vector2(0,0);
	outputs[0].title = "RGBA";
}

function GenTagInfos() {
	var alreadyExists:boolean = false;
	for (i = 0; i < editor.nodes.length; i++) {
		if (editor.nodes[i] == this) continue;
		if (editor.nodes[i] instanceof MaterialNode_TextureLightmap) {
			alreadyExists = true;
		}
	}
	if (alreadyExists) {
		EditorUtility.DisplayDialog("Error!","Your shader network contains multiple \""+title+"\" nodes. You can only have one if these in the network. To add more textures use a Texture node.","Ok");
	}
	//Poperty
	tagInfos[0].diffuseOnly = true;
	tagInfos[0].value = "_LightMap (\"Lightmap\", 2D) = \"gray\" {LightmapMode}";
	//Def
	tagInfos[1].value = "sampler2D _LightMap;";
	tagInfos[2].onceOnly = true;
	tagInfos[2].value = "float2 uvCoords;";
	//Frag
	outputs[0].value = "(tex2D(_LightMap,";
	if (inputs[0].connections.length > 0) 
		outputs[0].value += inputs[0].connections[0].value;
	else
		outputs[0].value += "IN.uvCoords";
	outputs[0].value += "))";
	
	//tagInfos[2].value = "uniform float4 _LightMap_ST;";
	//tagInfos[3].value = "o.uv.zw = TRANSFORM_TEX(v.texcoord1,_LightMap);";
}

}


class MaterialNode_TextureMain extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("TextureIcon01.psd");
	//hidden = true;
	deprecated = true;
	noOutputText = true;
	title = "MainTex";
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("PreFragBody",""));
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	
	inputs[0].title = "UV";
	inputs[0].value = Vector2(0,0);
	outputs[0].title = "RGBA";
}

function GenTagInfos() {
	var alreadyExists:boolean = false;
	for (i = 0; i < editor.nodes.length; i++) {
		if (editor.nodes[i] == this) continue;
		if (editor.nodes[i] instanceof MaterialNode_TextureMain) {
			alreadyExists = true;
		}
	}
	if (alreadyExists) {
		EditorUtility.DisplayDialog("Error!","Your shader network contains multiple \""+title+"\" nodes. You can only have one if these in the network. To add more textures use a Texture node.","Ok");
	}
	//Poperty
	tagInfos[0].diffuseOnly = true;
	tagInfos[0].value = "_MainTex (\"Main Texture\", 2D) = \"white\" {}";
	//Def
	tagInfos[1].value = "sampler2D _MainTex;";
	//FragDec
	tagInfos[2].value = "float4 "+shaderTitle+" = ";
	tagInfos[2].value += "tex2D(_MainTex,";
	tagInfos[3].onceOnly = true;
	tagInfos[3].value = "float2 uvCoords;";
	if (inputs[0].connections.length > 0) 
		tagInfos[2].value += inputs[0].connections[0].value;
	else
		tagInfos[2].value += "IN.uvCoords";
		
	tagInfos[2].value += ");";
	
	//Frag
	outputs[0].value = "("+shaderTitle+")";
}

}



class MaterialNode_TextureNormalMap extends MaterialNode {

function Awake(editorWindow:SFMaterialEditor) {
	super.Awake(editorWindow);
	SetIcon("TextureIcon01.psd");
	//hidden = true;
	deprecated = true;
	noOutputText = true;
	title = "NormalMap";
	inputs.Add(new MaterialNodeSocket(this));
	outputs.Add(new MaterialNodeSocket(this));
	
	tagInfos.Add(new MaterialNodeTagInfo("ShaderProperties",""));
	tagInfos.Add(new MaterialNodeTagInfo("CGDefs",""));
	tagInfos.Add(new MaterialNodeTagInfo("PreFragBody",""));
	tagInfos.Add(new MaterialNodeTagInfo("UVDefs",""));
	
	inputs[0].title = "UV";
	inputs[0].value = Vector2(0,0);
	outputs[0].title = "RGBA";
}

function GenTagInfos() {
	var alreadyExists:boolean = false;
	for (i = 0; i < editor.nodes.length; i++) {
		if (editor.nodes[i] == this) continue;
		if (editor.nodes[i] instanceof MaterialNode_TextureNormalMap) {
			alreadyExists = true;
		}
	}
	if (alreadyExists) {
		EditorUtility.DisplayDialog("Error!","Your shader network contains multiple \""+title+"\" nodes. You can only have one if these in the network. To add more textures use a Texture node.","Ok");
	}
	//Poperty
	tagInfos[0].diffuseOnly = true;
	tagInfos[0].value = "_BumpMap (\"Normal Map\", 2D) = \"white\" {}";
	//Def
	tagInfos[1].value = "sampler2D _BumpMap;";
	//FragDec
	tagInfos[2].value = "float4 "+shaderTitle+" = ";
	tagInfos[2].value += "(float4(UnpackNormal(tex2D(_BumpMap,";
	tagInfos[3].onceOnly = true;
	tagInfos[3].value = "float2 uvCoords;";
	if (inputs[0].connections.length > 0) 
		tagInfos[2].value += inputs[0].connections[0].value;
	else
		tagInfos[2].value += "IN.uvCoords";
	tagInfos[2].value += ")),0));";
	
	//Frag
	outputs[0].value = "("+shaderTitle+")";
}

}
