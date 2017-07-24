<?php


function mostrarCreditosAnul($datos)
{


session_start();
    //creacion de la tabla
?>

<table id='tabla' class='bordered centered highlight responsive-table centrarT'>
    <thead>
        <tr>
            <th>Fecha</th>
            <th>No. Comprobante</th>
            <th>Nit</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Tipo de Venta</th>
              <th></th>

        </tr>
    </thead>
    <tbody>
        <?php
	$extra="";
    $mysql = conexionMysql();
    $sql = "SELECT c.fecha,c.nocomprobante,p.nit,p.nombre,c.desembolso,c.idcreditos,(select u.user from usuarios u where u.idusuarios=c.idusuario) FROM creditos c inner join cliente p on p.idcliente=c.idcliente where c.estado=0 group by c.idcreditos order by c.fecha desc";
      $tabla="";
    if($resultado = $mysql->query($sql))
    {

        if(mysqli_num_rows($resultado)==0)
        {
            $respuesta = "<div class='error'>No hay Creditos Anulados</div>";
        }

        else
        {
			$contaId=0;

            while($fila = $resultado->fetch_row())
            {

                $tabla .= "<tr>";

                $tabla .="<td>"     .substr($fila["0"],0,10).    "</td>";
                $tabla .="<td>" .$fila["1"].      "</td>";
                $tabla .="<td>" .$fila["2"].      "</td>";
				$tabla .="<td>" .$fila["3"].      "</td>";
				$tabla .="<td>" .toMoney($fila["4"]).      "</td>";
				$tabla .="<td>" .$fila["5"].      "</td>";
				$tabla .="<td class='anchoC'>";
  				
				

                  $tabla .="<a class='waves-effect waves-light btn yellow dark-1 modal-trigger botonesm modalver'  onClick=\"buscarVenta('".$fila["6"]."');\"><i class='material-icons left'><img class='iconoeditcrud' src='../app/img/ojo.png' /></i></a></td>";
                  $tabla .= "</tr>";
  				$contaId++;
            }

            $resultado->free();//librerar variable


            $respuesta = $tabla;
        }
    }
    else
    {
        $respuesta = "<div class='error'>Error: no se ejecuto la consulta a BD</div>";

    }

    //cierro la conexion
    $mysql->close();

    //debuelvo la variable resultado
    return printf($respuesta);
        ?>
    </tbody>
</table>
<?php

}


?>