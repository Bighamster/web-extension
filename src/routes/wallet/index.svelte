<script lang="ts">
  import LL from "~/i18n/i18n-svelte.js";
  import { Router, link } from "svelte-routing";
</script>

<div>
  <Router>
    <a use:link class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-6"
       href="/wallet/create">{$LL.createAWallet()}</a>
    <a use:link class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
       href="/wallet/import">{$LL.importAWallet()}</a>
  </Router>
</div>
