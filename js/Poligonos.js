var sheetsUrlPoligonos ="https://docs.google.com/spreadsheets/d/e/2PACX-1vRg_NE8ZfdVfkSAq6M42MJGinsGJOlmenxk2ftz-IShghiNeGNuyM7mSBaiigxcQplMckg6FKM8QkT0/pub?output=csv";

function init() {
		Papa.parse(sheetsUrlPoligonos, {
        download: true,
        header: true,
        complete: function(results){
		 var data = results.data
		 console.log(data)
		 }
       })
     }

function addPolygons (results) {
	
	var polygons = {
	"type": "FeatureCollection",
	"features": []
	}
	
	var polygonsplanmaestroplades = {
		"color": "#1f140f",
		"weight": 2,
		"opacity": 0.4,
		"fillColor": "#d76780",
		"fillOpacity":	0.1,
		"pane": "PolygonsPane"
	}
	
	var polygonsgestlocalbarrios = {
		"color": "#1f140f",
		"weight": 2,
		"opacity": 0.4,
		"fillColor": "#50a6b7",
		"fillOpacity":	0.1,
		"pane": "PolygonsPane"
	}
	
	var polygonsconveniomunicip = {
		"color": "#1f140f",
		"weight": 2,
		"opacity": 0.4,
		"fillColor": "#dbc85e",
		"fillOpacity":	0.1,
		"pane": "PolygonsPane"
	}
	
	var polygonscentroplades = {
		"color": "#1f140f",
		"weight": 2,
		"opacity": 0.4,
		"fillColor": "#9bbe6b",
		"fillOpacity":	0.1,
		"pane": "PolygonsPane"
	}
	
	var polygonsmunicipalidad = {
		"color": "#1f140f",
		"weight": 2,
		"opacity": 0.4,
		"fillColor": "#ff9f71",
		"fillOpacity":	0.1,
		"pane": "PolygonsPane"
	}
	
	for (var row in data){
		
		var coords = JSON.parse(data[row].geometry);
		polygons.features.push({
			"type": "Feature",
			"geometry": {
				"type": "MultiPolygon",
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
					
		PolygonMarkers = L.geoJSON(polygons, {
			style: function (Feature){
				switch (Feature.properties.Tipo){
					case "Plan Maestro Plades": return polygonsplanmaestroplades;
					case "Gestión local y barrios": return polygonsgestlocalbarrios;	
					case "Proyectos convenio municipal 2019-2020": return polygonsconveniomunicip;
					case "Centro Plades": return polygonscentroplades;
					case "Municipalidad": return polygonsmunicipalidad;					
				}
			},
			onEachFeature: function (Feature, layer) {
				layer.bindPopup("<b>"+Feature.properties.Nombre+"</b>");
				layer.on({click: openSidebar});
				function openSidebar(e){sidebar.show();
					{sidebar.setContent("<h3>"+"<a href="+Feature.properties.Hipervinculo+" target=_blank>"+Feature.properties.Nombre+"</a></h3>"+"<img src = "+Feature.properties.Foto+" width=100%>"+"<p>"+Feature.properties.Descripcion+"</p>"+"<ul>"+"<li><b>Instituci&oacute;n ejecutora:&nbsp;</b>"+Feature.properties.Institucionejecutora+"</li>"+"<li><b>Programa o Fondo:&nbsp;</b>"+Feature.properties.ProgramaoFondo+"</li>"+"<li><b>Estado:&nbsp;</b>"+Feature.properties.Estado+"</li>"+"<li><b>Fecha inicio:&nbsp;</b>"+Feature.properties.Fechainicio+"</li>"+"<li><b>Fecha t&eacute;rmino:&nbsp;</b>"+Feature.properties.Fechatermino+"</li>"+"<li><b>Beneficiarios:&nbsp;</b>"+Feature.properties.Beneficiarios+"</li>"+"<li><b>Direcci&oacute;n:&nbsp;</b>"+Feature.properties.Direccion+"</li>"+"</ul>")
				}};			
				switch (Feature.properties.Categoria){
					case "Vialidad y transporte": return vyt.addLayer(layer);
					case "Áreas verdes": return av.addLayer(layer);
					case "Equipamiento social y centro cívico": return eqycc.addLayer(layer);
					case "Recuperación de barrios": return recbar.addLayer(layer);
					case "Gestión local y barrios": return glybar.addLayer(layer);
					case "Proyectos convenio municipal 2019-2020": return prymun.addLayer(layer);
					case "Centro Plades": return ctrpld.addLayer(layer);
					case "Seguridad pública": return segpub.addLayer(layer);
					case "Red eléctrica": return redelec.addLayer(layer);
					case "Soluciones sanitarias": return solsan.addLayer(layer);
					case "Agua Potable Rural (APR)": return apr.addLayer(layer);
					case "Fondo de Apoyo a la Educación Pública (FAEP)": return faep.addLayer(layer);
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
