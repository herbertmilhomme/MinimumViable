var tileMaskTexture:Texture2D;
@script ExecuteInEditMode()
@script AddComponentMenu ("ShaderFusion/ShaderGlobalScreenSize")
function Update () {
	Shader.SetGlobalTexture("_InterlaceAlphaLookupTex",tileMaskTexture);
	Shader.SetGlobalVector("_ScreenSize",Vector4(Screen.width, Screen.height, 0, 0));
}
