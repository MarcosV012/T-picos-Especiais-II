import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: TelaInicial(),
    debugShowCheckedModeBanner: false,
  ));
}

class TelaInicial extends StatefulWidget {
  @override
  _TelaInicialState createState() => _TelaInicialState();
}

class _TelaInicialState extends State<TelaInicial> {
  final TextEditingController _investidorController = TextEditingController();

  void _enviarDados() {
    String investidor = _investidorController.text;
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => TelaAtivo(investidor: investidor),
      ),
    );

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Identificação', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.blue,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.person, size: 80, color: Colors.blue),
            SizedBox(height: 30),
            TextField(
              controller: _investidorController,
              decoration: InputDecoration(labelText: 'Nome do Investidor',
              border: OutlineInputBorder(),
              prefixIcon: Icon(Icons.badge),
              ),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _enviarDados,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.indigo,
              ),
              child: Text(
                'Próximo',
                style: TextStyle(color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class TelaAtivo extends StatefulWidget {
  final String investidor;

  TelaAtivo({required this.investidor});

  @override
  _TelaAtivoState createState() => _TelaAtivoState();
}

class _TelaAtivoState extends State<TelaAtivo> {
  final TextEditingController _cryptoController = TextEditingController();
  final TextEditingController _valorController = TextEditingController();

  void _verRecibo(){
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => TelaRecibo(
          investidor: widget.investidor,
          ativo: _cryptoController.text,
          valor: _valorController.text,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold (
      appBar: AppBar(
        title: Text('Seleção de Ativo', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.orange,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            Icon(Icons.currency_bitcoin, size: 50, color: Colors.orange),
            SizedBox(height: 10),
            Text(
              'Olá, ${widget.investidor}! Qual ativo deseja comprar?',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center
            ),
            SizedBox(height: 20),
            TextField(
              controller: _cryptoController,
              decoration: InputDecoration(
                labelText: 'Nome da Criptomoeda (ex: Bitcoin)',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.currency_bitcoin),
              ),
            ),
            SizedBox(height: 10),
            TextField(
              controller: _valorController,
              decoration: InputDecoration(
                labelText: 'Valor do Investimento (R\$)',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.attach_money)
              ),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 30),
            ElevatedButton(
              onPressed: _verRecibo,
              style: ElevatedButton.styleFrom(backgroundColor: Colors.orange),
              child: Text('Ver comprovante', style: TextStyle(color: Colors.white)),
            ),
          ],
        ),
      ),
    );
  }
}

class TelaRecibo extends StatelessWidget {
  final String investidor;
  final String ativo;
  final String valor;

  TelaRecibo({required this.investidor, required this.ativo, required this.valor});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Recibo Final', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.green,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.check_circle_outline, size: 80, color: Colors.green),
              SizedBox(height: 10),
              Text(
                'Comprovante de Operação',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 10),
              Text('Investidor: $investidor', style: TextStyle(fontSize: 18)),
              SizedBox(height: 10),
              Text('Ativo: $ativo', style: TextStyle(fontSize: 18)),
              SizedBox(height: 10),
              Text('Total: R\$ $valor', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              SizedBox(height: 30),
              ElevatedButton(
                onPressed: () {
                  Navigator.popUntil(context, (route) => route.isFirst);
                },
                style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                child: Text('Confirmar', style: TextStyle(color: Colors.white)),
              ),
              SizedBox(height: 10),
              ElevatedButton(
                onPressed: () => Navigator.pop(context),
                child: Text(
                  'Corrigir Ativo', style: TextStyle(color: Colors.red),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
