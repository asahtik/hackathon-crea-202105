# VaxTrack

### Run using Linux + Nodejs

(_in root folder_)

1. npm install
2. chmod a+x run_bitcoind.sh (as root)
3. npm run initiate
4. Add two addresses to .env variables BITCOIN_ADDRESS and BITCOIN_OUTADDRESS (_curl --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getnewaddress", "params": []}' -H 'content-type: text/plain;' http://user:password@127.0.0.1:18332/_)
5. Add some BitCoin to account (_curl --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "generate", "params": [150]}' -H 'content-type: text/plain;' http://user:password@127.0.0.1:18332/_)

API should now be accessible on http://localhost:3000/api/*

