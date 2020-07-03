<template>
  <Page class="page" actionBarHidden="true">
    <ActionBar title="Clima" class="action-bar" />
    <FlexboxLayout flexDirection="column" class="container">
      <FlexboxLayout flexDirection="row" class="line space">
        <TextField v-model="city" hint="Cidade..." class="my-input" />
        <Button text="Consultar" @tap="fetchAPIData" class="my-button" />
      </FlexboxLayout>

      <!--NOME DA CIDADE -->
      <Label :text="result.name" class="cidade" />

      <!--TEMPERATURA -->
      <FlexboxLayout flexDirection="row" class="line space">
        <Label :text="setDecimal(main.temp)" class="temperatura" />
        <Label text="º" class="temperatura" />
      </FlexboxLayout>

      <!--CONDIÇÃO ATUAL -->
      <FlexboxLayout flexDirection="row" class="line space">
        <Label text="Condição: " class="condicaoBold" />
        <Label :text="weather.description" class="condicaoText" />
      </FlexboxLayout>

      <FlexboxLayout flexDirection="row">
        <!--MINIMA -->
        <FlexboxLayout flexDirection="column" class="box" id="minima">
          <FlexboxLayout flexDirection="row" class="line">
            <Label :text="setDecimal(main.temp_min)" class="boxValor" />
            <Label text="º" class="boxValor" />
          </FlexboxLayout>
          <Label text="Mínima" class="boxLabel" />
        </FlexboxLayout>
        <!--MÁXIMA -->
        <FlexboxLayout flexDirection="column" class="box" id="maxima">
          <FlexboxLayout flexDirection="row" class="line">
            <Label :text="setDecimal(main.temp_max)" class="boxValor" />
            <Label text="º" class="boxValor" />
          </FlexboxLayout>
          <Label text="Máxima" class="boxLabel" />
        </FlexboxLayout>
      </FlexboxLayout>

      <FlexboxLayout flexDirection="row">
        <!--SENSAÇÃO -->
        <FlexboxLayout flexDirection="column" class="box" id="sensacao">
          <FlexboxLayout flexDirection="row" class="line">
            <Label :text="setDecimal(main.feels_like)" class="boxValor" />
            <Label text="º" class="boxValor" />
          </FlexboxLayout>
          <Label text="Sensação" class="boxLabel" />
        </FlexboxLayout>
        <!--UMIDADE -->
        <FlexboxLayout flexDirection="column" class="box" id="umidade">
          <FlexboxLayout flexDirection="row" class="line">
            <Label :text="main.humidity" class="boxValor" />
            <Label text="%" class="boxValor" />
          </FlexboxLayout>
          <Label text="Umidade" class="boxLabel" />
        </FlexboxLayout>
      </FlexboxLayout>

      <!--ASSINATURA -->
      <FlexboxLayout flexDirection="row" class="assinatura">
        <Label text="Desenvolvido por " class="assText" />
        <Label text="Filipe Daineze." class="assBold" />
      </FlexboxLayout>
    </FlexboxLayout>
  </Page>
</template>
<script>
import * as http from "http";
export default {
  data() {
    return {
      result: [],
      main: {},
      weather: {},
      city: "São Roque",
      apiKey: "67950175dbecb2913540672f8f417c95",
      baseUrl: "https://api.openweathermap.org/data/2.5/weather",
      options: "&units=metric&lang=pt_br",
      url: ""
    };
  },
  methods: {
    fetchAPIData() {
      console.log("fetch!");
      this.url = `${this.baseUrl}?q=${this.city},br&APPID=${this.apiKey}${this.options}`;
      http.getJSON(this.url).then(
        result => {
          this.result = result;
          this.main = result.main;
          this.weather = result.weather[0];
          console.log(this.main);
        },
        error => {
          console.log("error", error);
        }
      );
    },
    setDecimal(valor) {
      if (!Number.isInteger(valor)) {
        let conta = parseFloat(valor);
        return conta.toFixed(1);
      } else {
        return valor;
      }
    }
  },
  mounted() {
    this.fetchAPIData();
  }
};
</script>

<style scoped>
</style>