var sheetsUrlLineas ="https://docs.google.com/spreadsheets/d/e/2PACX-1vQZvt58BuHAKch2AaUQsDc0Z-iQlvGIf5dZ0yrCEpWxiaJJt6wAVfFYvN4ZoCD5p5hie5eOWbFJ6JD1/pub?output=csv";

function init() {
    Papa.parse(sheetsUrlLineas,{
         download: true,
         header: true,
         complete: function(results){
			 var data = results.data
			 console.log(data)
		 }
       })
     }

function addLines (data, tabletop) {
	
	var lines = {
	"type": "FeatureCollection",
	"features": []
	}
	
	var linesplanmaestroplades = {
		"color": "#d76780",
		"dashArray": "10",
		"weight": 4,
		"opacity": 0.4,
		"pane": "LinesPane"
	}
	
	var linesgestlocalbarrios = {
		"color": "#50a6b7",
		"dashArray": "10",
		"weight": 4,
		"opacity": 0.4,
		"pane": "LinesPane"
	}
	
	var linesconveniomunicip = {
		"color": "#dbc85e",
		"dashArray": "10",
		"weight": 4,
		"opacity": 0.4,
		"pane": "LinesPane"
	}
	
	var linescentroplades = {
		"color": "#9bbe6b",
		"dashArray": "10",
		"weight": 4,
		"opacity": 0.4,
		"pane": "LinesPane"
	}
	
	var linesmunicipalidad = {
		"color": "#ff9f71",
		"dashArray": "10",
		"weight": 4,
		"opacity": 0.4,
		"pane": "LinesPane"
	}
	
	for (var row in data){
		
		var coords = JSON.parse(data[row].geometry);
		lines.features.push({
			"type": "Feature",
			"geometry": {
				"type": "MultiLineString",
				"coordinates": coords
			},
			"properties": {
				"Nombre": data[row].nombre,
				"Tipo": data[row].tipo,
				"Categoria": data[row].categoria,
				"Descripcion": data[row].descripcion,
				"Institucionejecutora": data[row].institucionejecutora,
				"ProgramaoFondo": data[row].programaofondo,
				"Estado": data[row].estado,
				"Fechainicio": data[row].fechainicio,
				"Fechatermino": data[row].fechatermino,
				"Beneficiarios": data[row].beneficiarios,
				"Direccion": data[row].direccion,
				"Foto": data[row].foto,
				"Hipervinculo": data[row].hipervinculo
			}
		});
				
		LineMarkers = L.geoJSON(lines, {
			style: function (Feature){
				switch (Feature.properties.Tipo){
					case "Plan Maestro Plades": return linesplanmaestroplades;
					case "Gesti??n local y barrios": return linesgestlocalbarrios;	
					case "Proyectos convenio municipal 2019-2020": return linesconveniomunicip;
					case "Centro Plades": return linescentroplades;
					case "Municipalidad": return linesmunicipalidad;					
				}
			},
			onEachFeature: function (Feature, layer) {layer.bindPopup("<b>"+Feature.properties.Nombre+"</b>");
				layer.on({click: openSidebar});
				function openSidebar(e){
					sidebar.show();
					{sidebar.setContent("<h3>"+"<a href="+Feature.properties.Hipervinculo+" target=_blank>"+Feature.properties.Nombre+"</a></h3>"+"<img src = "+Feature.properties.Foto+" width=100%>"+"<p>"+Feature.properties.Descripcion+"</p>"+"<ul>"+"<li><b>Instituci&oacute;n ejecutora:&nbsp;</b>"+Feature.properties.Institucionejecutora+"</li>"+"<li><b>Programa o Fondo:&nbsp;</b>"+Feature.properties.ProgramaoFondo+"</li>"+"<li><b>Estado:&nbsp;</b>"+Feature.properties.Estado+"</li>"+"<li><b>Fecha inicio:&nbsp;</b>"+Feature.properties.Fechainicio+"</li>"+"<li><b>Fecha t&eacute;rmino:&nbsp;</b>"+Feature.properties.Fechatermino+"</li>"+"<li><b>Beneficiarios:&nbsp;</b>"+Feature.properties.Beneficiarios+"</li>"+"<li><b>Direcci&oacute;n:&nbsp;</b>"+Feature.properties.Direccion+"</li>"+"</ul>")
					}
				};			
				switch (Feature.properties.Categoria){
					case "Vialidad y transporte": return vyt.addLayer(layer);
					case "??reas verdes": return av.addLayer(layer);
					case "Equipamiento social y centro c??vico": return eqycc.addLayer(layer);
					case "Recuperaci??n de barrios": return recbar.addLayer(layer);
					case "Gesti??n local y barrios": return glybar.addLayer(layer);
					case "Proyectos convenio municipal 2019-2020": return prymun.addLayer(layer);
					case "Centro Plades": return ctrpld.addLayer(layer);
					case "Seguridad p??blica": return segpub.addLayer(layer);
					case "Red el??ctrica": return redelec.addLayer(layer);
					case "Soluciones sanitarias": return solsan.addLayer(layer);
					case "Agua Potable Rural (APR)": return apr.addLayer(layer);
					case "Fondo de Apoyo a la Educaci??n P??blica (FAEP)": return faep.addLayer(layer);
					case "Fondo Nacional de Desarrollo Regional (FNDR)": return fndr.addLayer(layer);
					case "Fondo Regional de Iniciativa Local (FRIL)": return fril.addLayer(layer);
					case "Plan Mejoramiento urbano (PMU)": return pmu.addLayer(layer);
					case "Terrenos vivienda/municipales": return vivmun.addLayer(layer);
					case "Posibles proyectos": return posib.addLayer(layer);
					case "Otros proyectos": return otros.addLayer(layer);		
				};
			}
		});		
	}
	console.log(data);  
}

window.addEventListener('DOMContentLoaded', init)
