const base_url = "https://api.football-data.org/v2/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getKlasemen() {
	
	
  if ("caches" in window) {
    caches.match(base_url + "competitions/2014/standings?standingType=HOME",{
	  headers: new Headers({
		  'X-Auth-Token': 'f871ca32512a4e5787cebb25dc333fcb'
	  })
  }).then(function(response) {
	  var klasemensHTML = "";		  
		  var favorite=false;
      if (response) {
        response.json().then(function(data) {
		
		  if(data!=null){
			  data.standings.forEach(function(result){			
				
				klasemensHTML += `
				<table class="responsive-table">
				  <thead>
				  <tr>
					<th class="center">Position</th> 
					<th >Club</th>
					<th class="center">Played</th>
					<th class="center">Won</th>
					<th class="center">Draw</th>
					<th class="center">Lost</th>					
					<th class="center">Poin</th>
				  </tr>
				  </thead>
					  `;
					  
				result.table.forEach(function(tabel){
					var dbPromise = idb.open("dbfootball", 1, function(upgradeDb) {
					if (!upgradeDb.objectStoreNames.contains("klub")) {
						var klub=upgradeDb.createObjectStore("klub",{keypath:"id"});
						klub.createIndex("id","id",{unique:true});
					  }
					});
				  
				    var id_fav=`${tabel.team.id}`;
				  
				    dbPromise.then(function(db) {
						var tx = db.transaction('klub', 'readonly');
						var store = tx.objectStore('klub');
						return store.get(id_fav); 
					}).then(function(val) {
					  if(val!=null){
						if(val.id==id_fav)
							  favorite=true;
						  else
							  favorite=false;
					  }else{
						  favorite=false;
					  }
					});
					 
						klasemensHTML += `<tr>
						<td class="post"><div class="card center post-table">${tabel.position}</div></td>
						`;
						
						
						klasemensHTML +=`
						<td> <a class="white-text" href="./klub.html?id=${tabel.team.id}"><img src="${tabel.team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="max-width:50px;">${tabel.team.name}</a></td>
							<td class="center">${tabel.playedGames}</td>
							<td class="center">${tabel.won}</td>
							<td class="center">${tabel.draw}</td>
							<td class="center">${tabel.lost}</td>				
							<td class="center">${tabel.points}</td>
						</tr>
								`;
							});
						
					 klasemensHTML += `</table></div>
						  </div>
						`;
				  });
				
		  }
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("content-utama").innerHTML = klasemensHTML;
        });
      }
    });
  }

  
  fetch(base_url + "competitions/2014/standings?standingType=HOME",{
	  headers: new Headers({
		  'X-Auth-Token': 'f871ca32512a4e5787cebb25dc333fcb'
	  })
  })
    .then(status)
    .then(json)
    .then(function(data) {
		console.log(data);
		var klasemensHTML = "";		 
		  var favorite=false;
		data.standings.forEach(function(klasemen) {
			
		
        klasemensHTML += `
              
				  
				  <table class="responsive-table">
				  <thead>
				  <tr>
					<th >Position</th> 
					<th >Club</th>
					<th class="center">Played</th>
					<th class="center">Won</th>
					<th class="center">Draw</th>
					<th class="center">Lost</th>					
					<th class="center">Poin</th>
				  </tr>
				  </thead>
				  `;
			var dbPromise = idb.open("dbfootball", 1, function(upgradeDb) {
					if (!upgradeDb.objectStoreNames.contains("klub")) {
						var klub=upgradeDb.createObjectStore("klub",{keypath:"id"});
						klub.createIndex("id","id",{unique:true});
					  }
					});	  
			var i=1;
			klasemen.table.forEach(function(tabel){
				var id_fav=`${tabel.team.id}`;
					dbPromise.then(function(db) {
					  var tx = db.transaction('klub', 'readonly');
					  var store = tx.objectStore('klub');
					  return store.get(id_fav); 
					  
					}).then(function(val) {
					  if(val!=null){
						if(val.id==id_fav)
							  favorite=true;
						  else
							  favorite=false;
					  }else{
						  favorite=false;
					  }
					});
				  
				klasemensHTML += `<tr class="">
				<td class="post"><div class="card center post-table">${tabel.position}</div></td>
				`;
					
				
				
			klasemensHTML +=`				
				<td> <a class="white-text" href="./klub.html?id=${tabel.team.id}"><img src="${tabel.team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="max-width:50px;">${tabel.team.name}</a></td>
				<td class="center">${tabel.playedGames}</td>
				<td class="center">${tabel.won}</td>
				<td class="center">${tabel.draw}</td>
				<td class="center">${tabel.lost}</td>				
				<td class="center">${tabel.points}</td>
				</tr>
				`;
			});

         klasemensHTML += `</table>
              
            `;
      });
	  document.getElementById("content-utama").innerHTML = klasemensHTML;
    })
    .catch(error);
}

function setfav(id,nama,crestUrl,venue,fav){
	
	var dbPromise = idb.open("dbfootball", 1, function(upgradeDb) {
		if (!upgradeDb.objectStoreNames.contains("klub")) {
			var klub=upgradeDb.createObjectStore("klub",{keypath:"id"});
			klub.createIndex("id","id",{unique:true});
		  }
		});
		
	dbPromise.then(function(db) {
		 
		if(fav==false){
			var tx = db.transaction('klub', 'readwrite');
			var store = tx.objectStore('klub');
			var iconTeam = crestUrl.replace(/^http:\/\//i, 'https://');
			iconTeam = iconTeam
			var item = {
				nama: nama,
				crestUrl: iconTeam,
				venue: venue,
				id: id
			};
			store.add(item, id); 
			return tx.complete;
		}
	}).then(function() {
		console.log('Klub Favorite berhasil disimpan.');
		// $('#icon_fav'+id).html('favorite');
		// alert(' Klub Favorite berhasil disimpan.');
	})
}


function setDel(id){
	
	var dbPromise = idb.open("dbfootball", 1, function(upgradeDb) {
		if (!upgradeDb.objectStoreNames.contains("klub")) {
			var klub=upgradeDb.createObjectStore("klub",{keypath:"id"});
			klub.createIndex("id","id",{unique:true});
		  }
		});
		
	dbPromise.then(function(db) {
		 
		dbPromise.then(function(db) {
			var tx = db.transaction('klub', 'readwrite');
			var store = tx.objectStore('klub');
			store.delete(id);
			return tx.complete;
		  }).then(function() {
			console.log('Klub Favorite deleted');			
		  });
		
	}).then(function() {
		// alert(' Klub Favorite Berhasil Dihapus');
		console.log('Klub Favorite gagal disimpan.')
	})
}


function getFavorite(){
	var dbPromise = idb.open("dbfootball", 1, function(upgradeDb) {
		if (!upgradeDb.objectStoreNames.contains("klub")) {
			var klub=upgradeDb.createObjectStore("klub",{keypath:'id'});
			klub.createIndex("id","id",{unique:true});
		  }
		});
	dbPromise.then(function(db) {
		  var tx = db.transaction('klub', 'readonly');
		  var store = tx.objectStore('klub');
		  return store.getAll(); 
		}).then(function(val) {
		
		if(val!=null){
			favHTML="";		
			val.forEach(function(data){
				favHTML += `
							<div class="card center">
							<div class="card-image">
							<img class="center" style="width: 250px; height: auto;" src="`+data.crestUrl+`">							
							</div>
							<div class="card-content">
							<h4>`+data.nama+`</h4>
							<p>`+data.venue+`</p>
							</div>							
						</div>				
				`;
			});
			
			
		}
		
		// Sisipkan komponen card ke dalam elemen dengan id #content
		document.getElementById("content-utama").innerHTML = favHTML;

	  });
}

function getKlubById() {
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  var favorite=false;
  if ("caches" in window) {
    caches.match(base_url + "teams/" + idParam).then(function(response) {
      if (response) {
        response.json().then(function(data) {var dbPromise = idb.open("dbfootball", 1, function(upgradeDb) {
		if (!upgradeDb.objectStoreNames.contains("klub")) {
			var klub=upgradeDb.createObjectStore("klub",{keypath:"id"});
			klub.createIndex("id","id",{unique:true});
		  }
		});
	  
	  var id_fav=`${data.id}`;
		  dbPromise.then(function(db) {
			  var tx = db.transaction('klub', 'readonly');
			  var store = tx.objectStore('klub');
			  return store.get(id_fav); 
			}).then(function(val) {
			  if(val!=null){
				if(val.id==id_fav)
					  favorite=true;
				  else
					  favorite=false;
			  }else{
				  favorite=false;
			  }
			  
				var klubHTML = `
				<div class="club-header black">			  
				<div class="container">
					<div class="tombol fixed-action-btn">
					  <a href="javascript:" onclick="setfav('${data.id}','${data.name}','${data.crestUrl}','${data.venue}',`+favorite+`), M.toast({html: 'Klub Favorite berhasil disimpan'})" id="icon_fav${data.id}" class="btn-floating btn-large green">
						  <i class="large material-icons">save</i>
					  </a>
					  <a href="javascript:" onclick="setDel('${data.id}','${data.name}','${data.crestUrl}','${data.venue}',`+favorite+`), M.toast({html: 'Klub Favorite berhasil dihapus'})" class="btn-floating btn-large red ">
						<i class="large material-icons">delete</i>
					</a>
					</div>
				   
				
				  <div class="row">
					  <div class="col s12 m8 offset-m2 xl10 offset-xl1 center">
						  <h1 class="teamName">${data.name}</h1>
						  <img style="width: 300px; height: auto;" class="teamLogo" src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="ic_klub">
					  </div>							
				  </div>
				  <div class="row">
					  <div class="col s6 m6  xl3 center">
							<div class="card  center">
							  <img src="/img/icon/stadium.png" alt="ic_stadium">
							  <p>${data.venue}</p>
						  </div>
					  </div>
					  <div class="col s6 m6 xl3 center">
							<div class="card  center">
								<img src="/img/icon/alamat.png" alt="ic_alamat">
							  <p>${data.address}</p>
						  </div>
					  </div>
					  <div class="col s6 m6  xl3 center">
							<div class="card  center">
								<img src="/img/icon/telfon.png" alt="ic_telfon">
							  <p>${data.phone}</p>
						  </div>
					  </div>
					  <div class="col s6 m6  xl3 center">
							<div class="card  center">
								<img src="/img/icon/website.png" alt="ic_website">
							  <p>${data.website}</p>
						  </div>
					  </div>
				  </div>
			  </div>												
		  </div>	
		  
		  <div class="container player">
			  <div class="row">
				  <div class="col s12">          																
			  
				  <h3 class="center">SQUAD</h3>
				  <table>
					  <thead>
						  <tr>
							  <th>Shirt Number</th>
							  <th>Name</th>
							  <th>Position</th>
							  <th>Nationality</th> 					
											  
						  </tr>
					  </thead>
			`;
				data.squad.forEach(function(squad){
					klubHTML+= `
					<tr>
					<td>${squad.shirtNumber}</td>
					<td>${squad.name}</td>
					<td>${squad.position}</td>
					<td>${squad.nationality}</td> 				
					
					
				</tr>
			   `
		   })  
	   klubHTML += `</table>																		   	
				   </div>
			   </div>
			   </div>
			`;
		  // Sisipkan komponen card ke dalam elemen dengan id #content
		  document.getElementById("body-content").innerHTML = klubHTML;

		  });
        });
      }
    });
  }

  fetch(base_url + "teams/" + idParam,{
	  headers: new Headers({
		  'X-Auth-Token': 'f871ca32512a4e5787cebb25dc333fcb'
	  })
  	})
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data); 
	  
	  var dbPromise = idb.open("dbfootball", 1, function(upgradeDb) {
		if (!upgradeDb.objectStoreNames.contains("klub")) {
			var klub=upgradeDb.createObjectStore("klub",{keypath:"id"});
			klub.createIndex("id","id",{unique:true});
		  }
		});
	  
	  var id_fav=`${data.id}`;
	  
	  dbPromise.then(function(db) {
		  var tx = db.transaction('klub', 'readonly');
		  var store = tx.objectStore('klub');
		  return store.get(id_fav); 
		}).then(function(val) {
		  if(val!=null){
			if(val.id==id_fav)
				  favorite=true;
			  else
				  favorite=false;
		  }else{
			  favorite=false;
		  }
		  
			var klubHTML = `
			  <div class="club-header black">			  
				  <div class="container">
					  <div class="tombol fixed-action-btn">
						<a href="javascript:" onclick="setfav('${data.id}','${data.name}','${data.crestUrl}','${data.venue}',`+favorite+`), M.toast({html: 'Klub Favorite berhasil disimpan'})" id="icon_fav${data.id}" class="btn-floating btn-large green">
							<i class="large material-icons">save</i>
						</a>
						<a href="javascript:" onclick="setDel('${data.id}','${data.name}','${data.crestUrl}','${data.venue}',`+favorite+`), M.toast({html: 'Klub Favorite berhasil dihapus'})" class="btn-floating btn-large red ">
					  	<i class="large material-icons">delete</i>
					  </a>
					  </div>
					 
				  
					<div class="row">
						<div class="col s12 m8 offset-m2 xl10 offset-xl1 center">
							<h1 class="teamName">${data.name}</h1>
							<img style="width: 300px; height: auto;" class="teamLogo" src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="ic_klub">
						</div>							
					</div>
					<div class="row">
						<div class="col s6 m6  xl3 center">
		  					<div class="card  center">
								<img src="/img/icon/stadium.png" alt="ic_stadium">
								<p>${data.venue}</p>
							</div>
						</div>
						<div class="col s6 m6 xl3 center">
		  					<div class="card  center">
							  	<img src="/img/icon/alamat.png" alt="ic_alamat">
								<p>${data.address}</p>
							</div>
						</div>
						<div class="col s6 m6  xl3 center">
		  					<div class="card  center">
							  	<img src="/img/icon/telfon.png" alt="ic_telfon">
								<p>${data.phone}</p>
							</div>
						</div>
						<div class="col s6 m6  xl3 center">
		  					<div class="card  center">
							  	<img src="/img/icon/website.png" alt="ic_website">
								<p>${data.website}</p>
							</div>
						</div>
					</div>
				</div>												
			</div>	
			
			<div class="container player">
				<div class="row">
					<div class="col s12">          																
				
					<h3 class="center">SQUAD</h3>
					<table>
						<thead>
							<tr>
								<th>Shirt Number</th>
								<th>Name</th>
								<th>Position</th>
								<th>Nationality</th> 					
												
							</tr>
						</thead>
              `;
           	data.squad.forEach(function(squad){           		
           		klubHTML+= `
           			<tr>
						<td>${squad.shirtNumber}</td>
						<td>${squad.name}</td>
						<td>${squad.position}</td>
						<td>${squad.nationality}</td> 				
						
						
					</tr>
           		`
           	})  
           klubHTML += `</table>																		   	
			   		</div>
				   </div>
				   </div>
				   
          
        `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = klubHTML;

	  });
		
    });
}
