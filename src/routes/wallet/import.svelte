<script lang="ts">
  import LL from "~/i18n/i18n-svelte";
  import { Wallet } from "ethers";
  import { storageKeys, saveToStorage } from "~/lib/browsers";
  import { encrypt } from "~/lib/crypto";
  import { navigate } from "svelte-routing";
  import { session } from "~/storages/session";
  import { notifications, Button } from '@levefi/uikit';

  let phrases: string;
  let password = "qqq";
  let passwordConfirm = "qqq";
  let processing = false;
  let error: string | undefined;

  $: errorPasswordCondirm = password !== passwordConfirm

  async function importWallet() {

    try {

      processing = true;
      error = undefined;

      const wallet = Wallet.fromMnemonic(phrases.trim());
      const encryptor = await wallet.encrypt(password);
      const encrypedEncryptor = encrypt(encryptor, password);
      const encryptedPrivateKey = encrypt(wallet.privateKey, password);

      await saveToStorage(storageKeys.W_ENCRYPTOR, encrypedEncryptor);
      await saveToStorage(storageKeys.W_PRIVATE_KEY, encryptedPrivateKey);

      session.login(password, wallet.privateKey);

      console.log("wallet.mnemonic.phrase", wallet.mnemonic.phrase);

      navigate("/wallet", { replace: true });

    } catch (e: unknown) {
      error = e.message;
      // notifications.addNotification({ title: 'Failed to create wallet', content: e });
    } finally {
      processing = false;
    }

  }
</script>

<h1>{$LL.importAWallet()}</h1>

{#if error}
  <h5>{ error }</h5>
{/if}

<div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="phrases">
        {$LL.enterYouPhrases()}
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="phrases" type="text" required bind:value={phrases} />
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        {$LL.passwordLabel()}
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password" type="password" required placeholder="******************" bind:value={password} />
      {#if password.length <= 0}
        <p class="text-red-500 text-xs italic">{$LL.passwordError()}</p>
      {/if}
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="passwordConfirm">
        {$LL.passwordConfirmLabel()}
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="passwordConfirm" type="password" required placeholder="******************" bind:value={passwordConfirm} />
      {#if errorPasswordCondirm}
        <p class="text-red-500 text-xs italic">{$LL.passwordConfirmError()}</p>
      {/if}
    </div>
    <div class="flex items-center justify-between">
      <Button
        type="accent"
        class="block w-full"
        label={processing ? $LL.importingWalletButton() : $LL.importWalletButton()}
        on:click={importWallet}
        disabled={processing}
      />
    </div>
  </form>
</div>
