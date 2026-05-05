import 'package:flutter/material.dart';
import 'dart:math';

void main() => runApp(
  const MaterialApp(
    home: SimularInvestimento(),
    debugShowCheckedModeBanner: false,
  ),
);

class SimularInvestimento extends StatefulWidget {
  const SimularInvestimento({super.key});
  @override
  _SimularInvestimentoState createState() => _SimularInvestimentoState();
}

class _SimularInvestimentoState extends State<SimularInvestimento> {
  final TextEditingController _valorController = TextEditingController();
  final TextEditingController _aporteController = TextEditingController();
  final TextEditingController _taxaController = TextEditingController();
  final TextEditingController _periodoController = TextEditingController();

  String _resultado = '';

  _calcular() {
    setState(() {
      double valor = double.parse(_valorController.text);
      double aporte = double.parse(_aporteController.text);
      double taxa = double.parse(_taxaController.text) / 100;
      int periodo = int.parse(_periodoController.text);

      double montanteFinal = 0.0;

      if (taxa > 0) {
        double montantePrincipal = valor * pow((1 + taxa), periodo);
        double montanteAporte =
            aporte * ((pow((1 + taxa), periodo) - 1) / taxa);
        montanteFinal = montantePrincipal + montanteAporte;
      } else {
        montanteFinal = valor + (aporte * periodo);
      }

      _resultado = "R\$ ${montanteFinal.toStringAsFixed(2)}";
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF0F4F0),
      appBar: AppBar(
        title: const Text(
          "Simulador de Investimentos",
          style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
        ),
        centerTitle: true,
        backgroundColor: Colors.green[700],
        elevation: 4,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Icon(
              Icons.account_balance_wallet,
              size: 70,
              color: Colors.green[700],
            ),
            const SizedBox(height: 25),
            TextField(
              controller: _valorController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                labelText: "Valor Inicial",
                prefixText: "R\$ ",
                prefixIcon: const Icon(Icons.money, color: Colors.green),
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.green[700]!, width: 2),
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
            ),
            const SizedBox(height: 15),
            TextField(
              controller: _aporteController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                labelText: "Aporte Mensal",
                prefixText: "R\$ ",
                prefixIcon: const Icon(Icons.add_chart, color: Colors.green),
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.green[700]!, width: 2),
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
            ),
            const SizedBox(height: 15),
            TextField(
              controller: _taxaController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                labelText: "Taxa Mensal (%)",
                prefixIcon: const Icon(Icons.trending_up, color: Colors.green),
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.green[700]!, width: 2),
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
            ),
            const SizedBox(height: 15),
            TextField(
              controller: _periodoController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                labelText: "Período (Meses)",
                prefixIcon: const Icon(
                  Icons.calendar_month,
                  color: Colors.green,
                ),
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.green[700]!, width: 2),
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
            ),
            const SizedBox(height: 25),
            ElevatedButton(
              onPressed: _calcular,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green[700],
                padding: const EdgeInsets.symmetric(vertical: 18),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                elevation: 2,
              ),
              child: const Text(
                "CALCULAR RENDIMENTO",
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  letterSpacing: 1.1,
                ),
              ),
            ),
            const SizedBox(height: 35),
            if (_resultado.isNotEmpty)
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(15),
                  border: Border.all(color: Colors.green[700]!, width: 1.5),
                  boxShadow: [
                    BoxShadow(
                      color: const Color.fromARGB(13, 0, 0, 0),
                      blurRadius: 10,
                      offset: const Offset(0, 5),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    Text(
                      "Montante Final Estimado",
                      style: TextStyle(color: Colors.grey[600], fontSize: 14),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      _resultado,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                        color: Colors.green[800],
                      ),
                    ),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}
