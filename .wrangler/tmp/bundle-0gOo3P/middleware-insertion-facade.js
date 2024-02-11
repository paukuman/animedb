				import worker, * as OTHER_EXPORTS from "/home/jona/Dokumen/Project/anidb/.wrangler/tmp/pages-UPe71I/95qo5o8nlar.js";
				import * as __MIDDLEWARE_0__ from "/home/jona/Dokumen/Project/anidb/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts";
				const envWrappers = [__MIDDLEWARE_0__.wrap].filter(Boolean);
				const facade = {
					...worker,
					envWrappers,
					middleware: [
						__MIDDLEWARE_0__.default,
            ...(worker.middleware ? worker.middleware : []),
					].filter(Boolean)
				}
				export * from "/home/jona/Dokumen/Project/anidb/.wrangler/tmp/pages-UPe71I/95qo5o8nlar.js";

				const maskDurableObjectDefinition = (cls) =>
					class extends cls {
						constructor(state, env) {
							let wrappedEnv = env
							for (const wrapFn of envWrappers) {
								wrappedEnv = wrapFn(wrappedEnv)
							}
							super(state, wrappedEnv);
						}
					};
				

				export default facade;