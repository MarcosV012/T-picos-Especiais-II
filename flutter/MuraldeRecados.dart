import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(
      home: MuraldeRecados(),
      debugShowCheckedModeBanner: false,
    ));

class MuraldeRecados extends StatefulWidget {
  const MuraldeRecados({super.key});

  @override
  State<MuraldeRecados> createState() => _MuraldeRecadosState();
}

class _MuraldeRecadosState extends State<MuraldeRecados> {
  final TextEditingController _tituloController = TextEditingController();
  final TextEditingController _mensagemController = TextEditingController();

  final List<String> _titulos = [];
  final List<String> _mensagens = [];

  void _adicionarRecado() {
    setState(() {
      String titulo = _tituloController.text.trim();
      String mensagem = _mensagemController.text.trim();
      if (titulo.isNotEmpty && mensagem.isNotEmpty) {
        _titulos.insert(0, titulo);
        _mensagens.insert(0, mensagem);
        _tituloController.clear();
        _mensagemController.clear();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Mural de Recados'),
          backgroundColor: Colors.blueAccent[700],
          centerTitle: true,
        ),
        body: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
              children: [
                TextField(
                  controller: _tituloController,
                  decoration: const InputDecoration(
                    labelText: 'Título do Recado',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _mensagemController,
                  decoration: const InputDecoration(
                    labelText: 'Texto da Mensagem',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 15),
                ElevatedButton(
                  onPressed: _adicionarRecado,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blueAccent[700],
                    minimumSize: const Size(double.infinity, 55),
                  ),
                  child: const Text('Publicar', style: TextStyle(fontSize: 18, color: Colors.white)), 
                ),
                const SizedBox(height: 20), 
                
                Expanded(
                  child: _titulos.isEmpty
                      ? const Center(
                          child: Text(
                            'Nenhum recado publicado.',
                            style: TextStyle(color: Colors.grey, fontSize: 16),
                          ),
                        )
                      : ListView.builder(
                          itemCount: _titulos.length,
                          itemBuilder: (context, index) {
                            return Card(
                              elevation: 2,
                              margin: const EdgeInsets.symmetric(vertical: 6),
                              child: ListTile(
                                leading: const Icon(Icons.campaign, color: Colors.blueAccent),
                                title: Text(
                                  _titulos[index],
                                  style: const TextStyle(fontWeight: FontWeight.bold),
                                ),
                                subtitle: Text(_mensagens[index]),
                                trailing: Text(
                                  '#${_titulos.length - index}',
                                  style: const TextStyle(color: Colors.grey),
                                ),
                              ),
                            );
                          },
                        ),
                ),
              ]
          ),
        )
    );
  }
}