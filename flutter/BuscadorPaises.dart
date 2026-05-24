// Aluno: Marcos Vinícius de Castro Pavane
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http; // Pacote para requisições
import 'dart:convert'; // Pacote para converter JSON

void main() => runApp(const MaterialApp(
      home: BuscadorPaises(),
      debugShowCheckedModeBanner: false,
    ));

class BuscadorPaises extends StatefulWidget {
  const BuscadorPaises({super.key});

  @override
  State<BuscadorPaises> createState() => _BuscadorPaisesState();
}

class _BuscadorPaisesState extends State<BuscadorPaises> {
  final TextEditingController _paisCtrl = TextEditingController();
  
  // Variáveis para armazenar o estado da tela
  String _nomePais = "";
  String _capital = "";
  String _populacao = "";
  String _regiao = "";
  String _moeda = "";
  String _idioma = "";
  String _emoji = "";
  bool _carregando = false;
  
  // Variável extra para mudar a cor da AppBar dinamicamente (Desafio Nível 1)
  Color _corAppBar = Colors.blue; 

  // Função Assíncrona para buscar os dados na internet
  Future<void> _buscarPais() async {
    String pais = _paisCtrl.text.trim();

    // Validação de campo vazio
    if (pais.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Digite o nome de um país!")),
      );
      return;
    }

    setState(() {
      _carregando = true; // Ativa o indicador de "Loading"
    });

    final url = Uri.parse("https://restcountries.com/v3.1/name/$pais");

    try {
      // Faz a requisição GET e espera (await) a resposta
      final resposta = await http.get(url);

      if (resposta.statusCode == 200) {
        final lista = jsonDecode(resposta.body) as List;
        
        // Desafio Nível 2: Tratar lista vazia
        if (lista.isEmpty) {
          _mostrarErro("País não encontrado!");
          return;
        }

        final dados = lista[0]; // Pega o primeiro resultado

        setState(() {
          _nomePais = dados['name']['common'];
          
          // Trata a capital (caso o país não tenha)
          _capital = dados['capital'] != null ? dados['capital'][0] : "Sem capital";
          
          // Desafio Nível 1: Formatar população com pontos
          String popStr = dados['population'].toString();
          _populacao = popStr.replaceAllMapped(
              RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]}.');
          
          _regiao = '${dados["region"]} — ${dados["subregion"] ?? "N/A"}';
          _emoji = dados['flags']['emoji'] ?? '';
          
          // Moeda: pega o primeiro valor do Map de moedas
          if (dados['currencies'] != null) {
            final moedaMap = dados['currencies'].values.first;
            _moeda = '${moedaMap["name"]} (${moedaMap["symbol"]})';
          } else {
            _moeda = "Desconhecida";
          }
          
          // Idiomas: junta todos em uma String
          if (dados['languages'] != null) {
            final idiomas = dados['languages'] as Map;
            _idioma = idiomas.values.join(', ');
          } else {
            _idioma = "Desconhecido";
          }

          // Desafio Nível 1: Mudar a cor pela região
          switch (dados['region']) {
            case 'Americas': _corAppBar = Colors.green; break;
            case 'Europe': _corAppBar = Colors.indigo; break;
            case 'Asia': _corAppBar = Colors.red; break;
            case 'Africa': _corAppBar = Colors.orange; break;
            case 'Oceania': _corAppBar = Colors.purple; break;
            default: _corAppBar = Colors.blueGrey;
          }
        });
      } else {
        _mostrarErro("País não encontrado!");
      }
    } catch (e) {
      _mostrarErro("Erro de conexão.");
    } finally {
      setState(() {
        _carregando = false; // Desativa o "Loading" independente do resultado
      });
    }
  }

  // Função auxiliar para limpar a tela em caso de erro
  void _mostrarErro(String mensagem) {
    setState(() {
      _nomePais = mensagem;
      _capital = "";
      _populacao = "";
      _regiao = "";
      _moeda = "";
      _idioma = "";
      _emoji = "❌";
      _corAppBar = Colors.redAccent;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Buscador de Países"),
        backgroundColor: _corAppBar, // Cor dinâmica
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            TextField(
              controller: _paisCtrl,
              keyboardType: TextInputType.text,
              decoration: const InputDecoration(
                labelText: "Nome do país (em inglês)",
                hintText: "Ex: brazil, japan, portugal",
                border: OutlineInputBorder(),
              ),
              onSubmitted: (_) => _buscarPais(),
            ),
            const SizedBox(height: 20),
            
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                onPressed: _carregando ? null : _buscarPais,
                style: ElevatedButton.styleFrom(backgroundColor: _corAppBar),
                child: _carregando 
                    ? const CircularProgressIndicator(color: Colors.white)
                    : const Text("BUSCAR", style: TextStyle(color: Colors.white, fontSize: 16)),
              ),
            ),
            
            const SizedBox(height: 40),
            
            // Área de exibição do resultado (Card)
            if (_nomePais.isNotEmpty)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: _corAppBar.withValues(alpha: 0.1), 
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: _corAppBar),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '$_emoji $_nomePais', 
                      style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)
                    ),
                    const Divider(height: 30, thickness: 1), // Separador visual
                    
                    if (_capital.isNotEmpty) ...[
                      Text('Capital: $_capital', style: const TextStyle(fontSize: 16)),
                      const SizedBox(height: 8), // Desafio Nível 1: SizedBox entre as linhas
                      
                      Text('Região: $_regiao', style: const TextStyle(fontSize: 16)),
                      const SizedBox(height: 8),
                      
                      Text('População: $_populacao', style: const TextStyle(fontSize: 16)),
                      const SizedBox(height: 8),
                      
                      Text('Moeda: $_moeda', style: const TextStyle(fontSize: 16)),
                      const SizedBox(height: 8),
                      
                      Text('Idioma(s): $_idioma', style: const TextStyle(fontSize: 16)),
                    ]
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}