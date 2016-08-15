
class MaterialNodeSocket extends Object {
	//var position:Vector2;
	var title:String = "socket";
	var parent:MaterialNode;
	var size:Vector2 = Vector2(10,10);
	var screenPosition:Vector2;
	var connections:Array = new Array();
	var value;
	var hiddenData;
	var linkIndex:Vector2 = Vector2(-1,-1);
	
	function MaterialNodeSocket(parentNode:MaterialNode) {
		parent = parentNode;
		hiddenData = null;
	}
	function HasConnection(socket:MaterialNodeSocket):boolean {
		for (i = 0; i < connections.length; i++) {
			if (connections[i] == socket) return true;
		}
		return false;
	}
	function GetValue() {
		if (value instanceof String)
			return value;
		if (value instanceof float)
			return value.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
		if (value instanceof Vector2)
			return "("+
				value.x.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				value.y.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				")";
		if (value instanceof Vector3)
			return "("+
				value.x.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				value.y.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				value.z.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				")";
		if (value instanceof Vector4)
			return "("+
				value.x.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				value.y.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				value.z.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				value.w.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				")";
		if (value instanceof Color)
			return "("+
				value.r.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				value.g.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				value.b.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				value.a.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				")";
	}
	function GetHiddenValue() {
		if (hiddenData instanceof String)
			return value;
		if (hiddenData instanceof float)
			return hiddenData.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
		if (hiddenData instanceof Vector2)
			return "("+
				hiddenData.x.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				hiddenData.y.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				")";
		if (hiddenData instanceof Vector3)
			return "("+
				hiddenData.x.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				hiddenData.y.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				hiddenData.z.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				")";
		if (hiddenData instanceof Vector4)
			return "("+
				hiddenData.x.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				hiddenData.y.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				hiddenData.z.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				hiddenData.w.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				")";
		if (hiddenData instanceof Color)
			return "("+
				hiddenData.r.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				hiddenData.g.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				hiddenData.b.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				","+
				hiddenData.a.ToString(System.Globalization.CultureInfo.InvariantCulture.NumberFormat)+
				")";
	}
}
