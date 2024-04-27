### Randrianarisona Aaron

## Pré-config 
sudo apt-get update && sudo apt-get -y install openjdk-17-jdk 

binaire de besu = https://github.com/hyperledger/besu/releases/download/24.3.0/besu-24.3.0.tar.gz

Modification des variables d'environements
```sh
sudo vim ~/.bashrc
    ///dans .bashrc
    export PATH=/home/tpuser/Documents/besu-24.3.0/bin:$PATH //à remplacer par le chemin du binaire besu
    ///
source ~/.bashrc
```

dans cliqueGenesis.json, dans extra , remplacer <Node 1 adress > par l'adresse du node 1, sans "0x" en début de ligne

### Documentation : https://besu.hyperledger.org/stable/private-networks/tutorials/clique#2-get-the-address-for-node-1

## Generation du noeud validateur initiale et lancement
dans le repertoire Node-1
```sh
besu --data-path=data public-key export-address --to=data/node1Address
```

pour démarer le noeud :

```sh
    besu --data-path=data --genesis-file=../cliqueGenesis.json --network-id 1337 --rpc-http-enabled --rpc-http-api=ETH,NET,CLIQUE --host-allowlist="*" --rpc-http-cors-origins="all"
```

network-id doit correspondre à celle indiqué dans cliqueGenesis.json (chainId)

## Generation des autres noeuds (dans le repertoire du noeud):
```sh
besu --data-path=data --genesis-file=../cliqueGenesis.json --bootnodes=<Node-1 Enode URL> --network-id 1337 --p2p-port=30304 --rpc-http-enabled --rpc-http-api=ETH,NET,CLIQUE --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8546
```

`Node-1 Enode URL`  est récupérable au lancement du noeud.

`p2p-port propre `au noeud differents, et sert à communiquer entre noeuds.

`rps.http-port` est celle vu et accessible coté client

# Informaitions noeuds

- node 1

    > `Node address: ` 0xb9e16589efc9abfee67061caa3aebb5fb2c214e8,

    > `--rps.http.port:` 8545 (localhost),

    > `--p2p-port` 30303,

    > `Enode URL: `
    enode://2d3742c23cf075931311b1c8d05e83bc616ca7260aeec806cfce4a8461f0bfc180fbf8886f46b43a1f186dd17a7fb0a3c3e9624f19b09e07f98764f5e0922c48@127.0.0.1:30303

- node 2

    > `Node address: `0xbfb108c757e5b414f692329c184f2caf078b1f04,

    > `--rps.http.port` 8546 (localhost),

    > `--p2p-port `30304,

- node 3

    > `Node address` 0x5ccba40615d6fedef70d7b9df353229884d4f655

    > `--rps.http.port` 8547 (localhost)

    > `--p2p-port` 30305

### add signer
pour faire une demande pour devenir validateur:
```sh
curl -X POST --data '{"jsonrpc":"2.0","method":"clique_propose","params":["<future_node_signer_adresss>", true], "id":1}' <JSON-RPC-endpoint:port>
```
dans notre cas:
`JSON-RPC-endpoint:port` = localhost:port_http_du_noeud_courant,

`future_node_signer_adresss` est l'addresse du noeud qui veut etre validateur.

To return a list of signers and confirm the addition of a proposed signer, call clique_getSigners.

```sh
curl -X POST --data '{"jsonrpc":"2.0","method":"clique_getSigners","params":["latest"], "id":1}' <JSON-RPC-endpoint:port>
```

to discard proposition:
```sh
curl -X POST --data '{"jsonrpc":"2.0","method":"clique_discard","params":["<future node signer adresss>"], "id":1}' <JSON-RPC-endpoint:port>
```

