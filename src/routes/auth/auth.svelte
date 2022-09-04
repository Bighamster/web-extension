<script lang="ts">
  import LL from "~/i18n/i18n-svelte";
  import { getInStorage, saveToStorage, storageKeys } from "~/lib/browsers";
  import { Wallet } from "ethers";
  import { encrypt, decrypt } from "~/lib/crypto";
  import { callbackCryptWallet } from "~/lib/loader/loader";
  import { Router, Link } from "svelte-routing";
  import { session } from "~/storages/session";
  import { notifications, Button } from '@levefi/uikit';

  let password = 'qqq';
  let processing = false;
  let error: string | undefined;

  async function auth(){
    try {

      processing = true;
      error = undefined;

      const storeData   = await getInStorage(storageKeys.W_ENCRYPTOR);
      const decodedData = decrypt(storeData, password);
      const wallet      = await Wallet.fromEncryptedJson(decodedData, password);

      await saveToStorage(storageKeys.W_PRIVATE_KEY, encrypt(wallet.privateKey, password));

      session.login(password, wallet.privateKey);

    } catch (e: unknown) {
      error = e.message;
      // notifications.addNotification({ title: 'Error', content: e });
    } finally {
      processing = false;
    }
  }
</script>

<h1>{$LL.authPageHeadline()}</h1>

{#if error}
  <h5>{ error }</h5>
{/if}

<div class="w-full max-w-xs">

  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" on:submit|preventDefault={auth}>
    <div class="mb-2">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        {$LL.passwordLabel()}
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password" type="password" required placeholder="******************" bind:value={password} />
    </div>
    <div class="flex items-center justify-between">
      <Button
        type="accent"
        class="block w-full"
        label={processing ? $LL.unlocking() : $LL.unlock()}
        on:click={auth}
        disabled={processing}
      />
    </div>
  </form>

  <Router>
    <Link to="wallet/createorimport">{$LL.createWalletsText()}</Link>
  </Router>

  <!-- <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/wallet">
    {$LL.createWalletsText()}
  </a> -->

</div>
