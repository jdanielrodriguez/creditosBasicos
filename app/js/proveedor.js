//************************** globales *********************
var gobIDElim,gobIDEdit;
var passHabilita=0;
//**************************************************
//*************************Iniciales
/*$('#contenidoCrud').mouseenter(function(){
    document.getElementById('formUser').reset();
});
*/
//***********************************
//************************** tabla ***********************


$('#tablaPro').DataTable( {

    info:     false,



    language: {

        search: "Buscar",
        sLengthMenu:" _MENU_ ",

        paginate:{

            previous: "Anterior",
            next: "Siguiente",

        },

    },
    /*
			   "scrollY":        "375px",
        "scrollCollapse": true,
        "paging":         true
         */
} );


//$('select').material_select();

//*********************************************************

//*************** modal ***********************************






function abrirProvNuevo(){

    $('#btnActualizar').hide();
    $('#btnInsertar').show();
    $('#modal1P').openModal();
	cierre();
}

function seleccionar(id)
{


	buscarNIT(id);

	$('#modal4').closeModal();
	cierre();
}
$('.modaleliminarP').click(function(){

    event.preventDefault();

    gobIDElim = event.target.dataset.elim;

    $('#modal3P').openModal();

});


$('#verCliente').click(function(){


   $('#modal4').openModal();

});




$(".dropdown-button").dropdown();

//*********************************************************




//comprobaciones
function distribuidores(prov)
{


		$('#modal4P').openModal();
		llamarDistribuidor();


}
function llamarDistribuidor()
{

	$.ajax
        ({
            type:"POST",
            url:"Distribuidores.php",
            success: function(resp)
            {
				$('#distribuidorContenedor').html(resp);
            }
        });
}


//**********************



function ingresarProveedorP(){

    // alert('hola');

    $('#precargar').show();

    var  nombre, direccion, telefono, nit, cuenta,  trasDato;

        nombre = $('#nombreP').val();
		direccion = $('#direccionP').val();
		telefono = $('#telefonoP').val();
		nit = $('#nitP').val();
		cuenta = $('#cuentaDepP').val();
		codigo = $('#codigoP').val();

		if(codigo=="")
		{
			trasDato = 1;
		}
		else
		{
        	trasDato = 3;
		}



        $.ajax
        ({
            type:"POST",
            url:"../core/controlador/proveedorControlador.php",
            data:' nombre=' +  nombre + '&direccion=' + direccion + '&nit=' + nit + '&telefono=' + telefono + '&cuenta=' + cuenta + '&codigo=' + codigo + '&trasDato=' + trasDato,
            success: function(resp)
            {


                {
					  cierre();
					  if(typeof llamarProveedor === 'function')
					  {
							//Es seguro ejecutar la función
							llamarProveedor();
						}
						else
						{
							location.reload();
						}

                }


            }
        });



}



function editarProv(id)
{

    $('#modal1P').openModal();
	trasDato = 2;
        $.ajax
        ({
            type:"POST",
            url:"../core/controlador/proveedorControlador.php",
            data:' id=' +  id + '&trasDato=' + trasDato,
            success: function(resp)
            {
				$('#mensajeP2').html(resp);
            }
        });

}


$('#modalProveedor').click(function(){
	$('#modal4').closeModal();
	//alert('sdjhfkjshfjk');
});


$('#btnInsertarP').click(function(){


	$('#modalP').closeModal();
cierre();

});
