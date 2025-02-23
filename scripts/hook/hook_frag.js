		{{clazz_hook}} = Java.use("{{clazz_name}}");
		var overloadz_{{clazz_hook}} = eval("{{clazz_hook}}.{{method_name}}.overloads");
		var ovl_count_{{clazz_hook}} = overloadz_{{clazz_hook}}.length;
		var {{clazz_hook}}_{{ method_hook }} = null
		

		var cell = {}

		
		{% if overload_type%}
		{{clazz_hook}}_{{ method_hook }} = eval("{{clazz_hook}}.{{ method_name }}.overload({{overload_type}})")
	    {{clazz_hook}}_{{ method_hook }}.implementation = function () {
	    	var sendback = ''
	    	var hook_signature = '-hoo00ook-'
	    	var method_info = ''
	    	var arg_dump = ''
	    	var arg_type = ''
	    	var ret_type = String({{clazz_hook}}_{{ method_hook }}.returnType['className'])

	        for (var index = 0; index < arguments.length; index++) {
						try {
							var argTemp = arguments[index];
							if (argTemp === undefined) {
								throw "arg Undefined";
							}
							if (typeof(argTemp) != 'object' ) {
								throw "arg is not object";
							}
							//console.log(typeof(argTemp) + ' : ' + argTemp );
							var className = Java.cast(argTemp.getClass(), Java.use("java.lang.Class")).getName();
							arg_type += ('argType' + index.toString() + " (" + className + ") : " + String(typeof(arguments[index])) + ' ')
							arg_dump += ("arg" + index.toString() + " (" + className + ") : " + String(arguments[index]) + linebreak)
						} catch(err) {
							//console.log(err);
							arg_type += ('argType' + index.toString() + " : " + String(typeof(arguments[index])) + ' ')
							arg_dump += ("arg" + index.toString() + ": " + String(arguments[index]) + linebreak)
						}
	        }
	        method_info += "Reverse Call Stack: " + linebreak + getCaller() + linebreak + linebreak + {{clazz_hook}}_{{ method_hook }}.methodName + '( ' + arg_type+ ') '
	        // var retval = eval('this.{{ method_name }}.apply(this, arguments)')
	        try {
                retval = eval('this.{{ method_name }}.apply(this, arguments)')
            } catch (err) {
                retval = null
                console.log("Exception - cannot compute retval.." + String(err))
            }
	        var retval_dump = "(" + ret_type + ') : ' + String(retval) + linebreak + "@ " + getTime()
	        cell = {"method_info" : method_info, "arg_dump" : arg_dump, "retval_dump" : retval_dump}

	        sendback = hook_signature + JSON.stringify(cell)
	        // console.log(arg_dump + retval_dump);
	        send(sendback)
	        return retval;
	    }
		{% else %}
		send("There are " + ovl_count_{{clazz_hook}}.toString() + " methods to hook");
		for (var i = 0; i < ovl_count_{{clazz_hook}}; i++) {
			{{clazz_hook}}_{{ method_hook }} = eval('{{clazz_hook}}.{{ method_name }}.overloads[i]')
		    {{clazz_hook}}_{{ method_hook }}.implementation = function () {
		    	var sendback = ''
		    	var hook_signature = '-hoo00ook-'
		    	var method_info = ''
		    	var arg_dump = ''
		    	var arg_type = ''
		    	var ret_type = String({{clazz_hook}}_{{ method_hook }}.returnType['className'])
		        for (var index = 0; index < arguments.length; index++) {
							try {
								var argTemp = arguments[index];
								if (argTemp === undefined) {
									throw "arg Undefined";
								}
								if (typeof(argTemp) != 'object' ) {
									throw "arg is not object";
								}
								//console.log(typeof(argTemp) + ' : ' + argTemp );
								var className = Java.cast(argTemp.getClass(), Java.use("java.lang.Class")).getName();
								arg_type += ('argType' + index.toString() + " (" + className + ") : " + String(typeof(arguments[index])) + ' ')
								arg_dump += ("arg" + index.toString() + " (" + className + ") : " + String(arguments[index]) + linebreak)
							} catch(err) {
								//console.log(err);
								arg_type += ('argType' + index.toString() + " : " + String(typeof(arguments[index])) + ' ')
								arg_dump += ("arg" + index.toString() + ": " + String(arguments[index]) + linebreak)
							}
		        }
		        method_info += "Reverse Call Stack: " + linebreak + getCaller() + linebreak + linebreak + {{clazz_hook}}_{{ method_hook }}.methodName + '( ' + arg_type+ ') '
		        // var retval = eval('this.{{ method_name }}.apply(this, arguments)')
		        try {
	                retval = eval('this.{{ method_name }}.apply(this, arguments)')
	            } catch (err) {
	                retval = null
	                console.log("Exception - cannot compute retval.." + String(err))
	            }
		        var retval_dump = "(" + ret_type + ') : ' + String(retval) + linebreak + "@ " + getTime()
		        cell = {"method_info" : method_info, "arg_dump" : arg_dump, "retval_dump" : retval_dump}

		        sendback = hook_signature + JSON.stringify(cell)
		        // console.log(arg_dump + retval_dump);
		        send(sendback)
		        return retval;
		    }
		}
		{% endif %}


