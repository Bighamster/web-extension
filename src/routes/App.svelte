<script lang="ts">
  import LL from "~/i18n/i18n-svelte";
  import { setLocale } from '~/i18n/i18n-svelte';
  import { baseLocale } from '~/i18n/i18n-util';
  import { loadLocaleAsync } from '~/i18n/i18n-util.async';
  import { Router, Route } from "svelte-routing";
  import { session } from "~/storages/session";
  import { Button } from '@levefi/uikit';

  import CreateOrImportWallet from "~/routes/wallet/index.svelte";
  import CreateWallet from "~/routes/wallet/create.svelte";
  import ImportWallet from "~/routes/wallet/import.svelte";
  import Wallet from "~/routes/wallet/wallet.svelte";
  import Auth from "~/routes/auth/auth.svelte";
  import Pending from "~/routes/auth/pending.svelte";

  // export let url = "wallet/create";
  export let url = "/";

  loadLocaleAsync(baseLocale).then(() => setLocale(baseLocale));

  const lock = () => {
    session.logout();
  }

  $: console.log('session', $session)

</script>

<main class="grid place-items-center h-screen my-4">

  {#if $session == 'valid'}
    <Button
      type="accent"
      class="block"
      label={$LL.lock()}
      on:click={lock}
    />
  {/if}

  <Router url="{url}">
    <Route path="/">
      <!-- <Auth /> -->
      {#if $session == 'valid'}
        <Wallet />
      {:else if $session == 'invalid'}
        <Auth />
      {:else}
        <Pending />
      {/if}
    </Route>

    <Route path="wallet" component="{Wallet}" />
    <Route path="wallet/createorimport" component="{CreateOrImportWallet}" />
    <Route path="wallet/create" component="{CreateWallet}" />
    <Route path="wallet/import" component="{ImportWallet}" />
  </Router>

</main>
