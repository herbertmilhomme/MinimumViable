class MaterialNodeTagInfo extends Object {
	var tag:String;
	var value:String;
	var diffuseOnly:boolean;
	var onceOnly:boolean;
	var spend:boolean;
	function MaterialNodeTagInfo(tagName:String, insertValue) {
		tag = tagName;
		value = insertValue;
		diffuseOnly = false;
		onceOnly = false;
		spend = false;
	}
}
