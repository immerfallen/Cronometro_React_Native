import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Button, Image } from 'react-native'
import imagem from './assets/corrida.JPG'


class Mo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            horas: 0,
            minutos: 0,
            segundos: 0,
            ativo: false,
            voltas: [],
            nroVolta: 0,
            numeroVoltas: []
        }


        this.pulsoDeClock = this.pulsoDeClock.bind(this)
        this.iniciaRelogio = this.iniciaRelogio.bind(this)
        this.pararRelogio = this.pararRelogio.bind(this)
        this.marcarVolta = this.marcarVolta.bind(this)
        this.zerarRelogio = this.zerarRelogio.bind(this)
        this.numeroDaVolta = this.numeroDaVolta.bind(this)
        
    }
     

    iniciaRelogio() {
        if (!this.state.ativo) {
            this.setState({ clock: setInterval(this.pulsoDeClock, 1000) })
            this.setState({ ativo: true })
        }
    }

    pulsoDeClock() {
        var h = this.state.horas
        var m = this.state.minutos
        var s = this.state.segundos

        if (s < 59) {
            s++
        } else {
            s = 0
            if (m < 59) {
                m++
            } else {
                m = 0
                h++
            }
        }

        this.setState({ segundos: s, minutos: m, horas: h })
    }
    

    numeroDaVolta(){
      
      
    }

    pararRelogio() {
        if (this.state.ativo) {
            clearInterval(this.state.clock)
            this.setState({ ativo: false })
        }
    }

    marcarVolta() {
        var txtDoCronometro = this.formatar(this.state.horas) + ":" + this.formatar(this.state.minutos) + ":" + this.formatar(this.state.segundos) + "\n"
        this.state.voltas.push(txtDoCronometro)       
        var nrVolta = this.state.nroVolta
        nrVolta = nrVolta+1   
        this.setState({nroVolta : nrVolta})        
        this.state.numeroVoltas.push(nrVolta + '\n')
        this.forceUpdate()
        

    }    

    formatar(t) {
        return (t < 10) ? "0" + t.toString() : t.toString()
    }
    

    zerarRelogio() {
        this.pararRelogio()
        this.setState({ segundos: 0, minutos: 0, horas: 0 })
        
        if (this.state.voltas.length > 0) {
            this.state.voltas.push('--------\n ')
            
        }       
        
    }

    

    render() {
        var txtH = this.formatar(this.state.horas)
        var txtM = this.formatar(this.state.minutos)
        var txtS = this.formatar(this.state.segundos)

        return ( 
            <View>
              <View style={styles.imageContainer}>
                <Image source={imagem} style={styles.image}></Image>  
              </View>         
              <ScrollView>            
                <View style={styles.header}>
                      <Text> Cronômetro </Text>  
                      <Text > { txtH }: { txtM }: { txtS } </Text>  
                </View> 
                    
                <Button onPress = {(this.state.ativo ? this.pararRelogio : this.iniciaRelogio) } title = {
                  (this.state.ativo ? "Pausar" : "Iniciar") }/> 
                <Button onPress = { this.marcarVolta} title = "Marcar volta" />
                <Button onPress = { this.zerarRelogio } title = "Zerar" />
                    
                <View style={styles.voltas}>
                  <View style={styles.nroVoltas}>
                      <Text>                        
                        {this.state.numeroVoltas} 
                      </Text>
                  </View>
                  <View style={styles.tempoVoltas}>
                    <Text>                       
                      {this.state.voltas} 
                    </Text>
                  </View>
                   
                    
                </View>  
              </ScrollView>
            </View>
        )
    }
}

export default Mo

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    alignItems : 'center'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: ' center'    
  },
  image: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: ' center',
    flex: 1
  },
  imageContainer: {
    margin: 30,
    alignItems: 'center',
    justifyContent: ' center',
    flex: 1
  },
  voltas: {
    flexDirection: 'row',

  },
  nroVoltas: {
    flex: 1,
    alignItems: ' center'
  },
  tempoVoltas:{
    flex:1,
    alignItems: ' center'
  }
})