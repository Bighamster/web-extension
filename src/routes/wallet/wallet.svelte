<script lang="ts">
  import { ethers, Wallet } from "ethers";
  import LL from "~/i18n/i18n-svelte.js";
  import { session } from "~/storages/session";
  import { Button } from '@levefi/uikit';

  let wallet: Wallet;
  let balance = '0';
  let historyOfTransactions = [];
  let transaction = {
    amount: 0,
    address: ''
  };

  const loadWallet = async () => {

    wallet = new Wallet(session.getPrivateKey());

    const provider = new ethers.providers.EtherscanProvider('homestead','UU2HU89XE48KND2QPKRUGE63PGJG6PAC3A')

    wallet = wallet.connect(provider);

    setInterval(async () => {
      balance = await wallet.getBalance().then(data => data.toString())
    }, 30000);

    setInterval(async () => {
      historyOfTransactions = await provider.getHistory( await wallet.getAddress())
    }, 60000);

  }

  async function sendTransaction() { console.log('sendTransaction');
    try {
      const balance = await wallet.getBalance()

      if (transaction.address === '' || transaction.amount <= 0 || transaction.amount.toString() > balance.toString()) {
        return
      }

      await wallet.sendTransaction({to: transaction.address, value: transaction.amount})
    } catch (e : unknown) {
      console.log(e);
    }
  }

  loadWallet();

</script>

{#if wallet }
  <div class="block text-gray-700 text-sm font-bold mb-2">{wallet.address}</div>
{/if}

<h2>{$LL.balance({balance})}</h2>

<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div class="mb-6">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="address">
      {$LL.transactionAddress()}
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      id="address" type="text" required placeholder="0x0000000000000000000000000000000000000000" bind:value={transaction.address} />
  </div>
  <div class="mb-6">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="amount">
      {$LL.transactionAmount()}
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      id="amount" type="number" required placeholder="1" bind:value={transaction.amount} />
  </div>
  <div class="flex items-center justify-between">
    <Button
      type="accent"
      class="block"
      label={$LL.sendTransactionButtonText()}
      on:click={sendTransaction}
    />
  </div>
</form>
<div class="transactions">
  {#each historyOfTransactions as history,i }
    <div class="transaction">
      <p>from: {history.from}</p>
      <p>to: {history.to}</p>
      <p>value: {history.value}</p>
      <p>gas: {history.gas}</p>
    </div>
  {/each}
</div>
