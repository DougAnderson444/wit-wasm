<script>
	// @ts-nocheck

	import { onMount } from 'svelte';

	let results = { think: null, smokeDemo: null };
	let demo, direct, smokeDemo, think;

	onMount(async () => {
		console.log('onMount');
		// import { demo, direct, smokeDemo, think } from '../../../dist/js/wit_wasm.component.js';
		// @ts-ignore
		const wasm = await import('../js/wit_wasm.component.js');
		await wasm.$init; // wait for wasm to initialize
		({ demo, direct, smokeDemo, think } = wasm);

		console.log('demo', { demo, direct, smokeDemo, think });

		// thank: {smokeDemo.thank('you')}
		// pank: {direct.pank()}
		results.think = think('original message');
		results.smokeDemo = smokeDemo.thank('you');
		direct.pank(); // no return value
	});
</script>

<pre><code>
{JSON.stringify(results, null, 2)}
</code>
</pre>

{#if think}
	{#await think then think}
		<div>
			Think: {think('original message')}
		</div>
	{/await}
{/if}

{#if smokeDemo}
	{#await smokeDemo then smokeDemo}
		<div>
			Thank: {smokeDemo.thank('you')}
		</div>
	{/await}
{/if}
