# ReSea EyeWear — Frontend

E-commerce frontend per **ReSea EyeWear**, un brand di occhiali sostenibili. L'applicazione offre catalogo prodotti con filtri per categoria, dettaglio prodotto, carrello, wishlist, un flusso di checkout con calcolo IVA e pagamento simulato, e un assistente virtuale AI ("GretAI Thun") integrato per supportare l'utente nella scelta dei prodotti.

## Indice

- [Stack tecnologico](#stack-tecnologico)
- [Struttura del progetto](#struttura-del-progetto)
- [Prerequisiti](#prerequisiti)
- [Installazione](#installazione)
- [Variabili d'ambiente](#variabili-dambiente)
- [Utilizzo](#utilizzo)
- [Routing](#routing)
- [Deploy](#deploy)
- [Contributi](#contributi)
- [Licenza](#licenza)

## Stack tecnologico

- **[React 19](https://react.dev/)** — libreria UI a componenti, con Hooks e Context API
- **[Vite 8](https://vite.dev/)** — build tool e dev server
- **[React Router 7](https://reactrouter.com/)** — routing lato client (`BrowserRouter`)
- **[Bootstrap 5](https://getbootstrap.com/)** + **Bootstrap Icons** — layout e componenti UI di base
- **CSS Modules** — stili scoped per componente (`*.module.css`)
- **[ESLint 10](https://eslint.org/)** — linting (flat config)

Gestione dello stato tramite React Context (`AppContext` per carrello/wishlist/ricerca, persistiti in `localStorage`; `CategoriesContext` per le categorie prodotto recuperate dall'API).

## Struttura del progetto

```
src/
├── assets/         # immagini e risorse statiche
├── components/      # componenti riutilizzabili (Hero, CartList, ProductCardGrid, ...)
├── context/          # AppContext (cart/wishlist/search), CategoriesContext
├── data/            # dati statici locali (es. slide della hero)
├── hooks/           # hook custom (useFetch, useCheckout, useAssistantChat)
├── layout/          # layout principale dell'app (Structure)
├── pages/           # pagine/route (Homepage, Product, Cart, Checkout, Wishlist, ...)
├── services/        # client API e funzioni di utilità (api, orders, payment, validators, formatters)
├── App.jsx          # definizione delle route
└── main.jsx         # entry point
```

## Prerequisiti

- [Node.js](https://nodejs.org/) 20 o superiore
- [pnpm](https://pnpm.io/) installato globalmente

## Backend
Il frontend comunica con un'API REST dedicata. Puoi trovare il repository del backend qui:
[reSea Backend](https://github.com/AbdeslamElFtouh/reSea-Express)

## Installazione

```bash
pnpm install
```

## Variabili d'ambiente

Il frontend comunica con un backend separato tramite la variabile `VITE_API_URL`. Crea un file `.env` nella root del progetto:

```bash
VITE_API_URL=http://localhost:3000
```

Se non impostata, l'app utilizza `http://localhost:3000` come valore di default.

## Utilizzo

```bash
# avvia il server di sviluppo con HMR
pnpm dev

# genera la build di produzione
pnpm build

# avvia un server locale per verificare la build di produzione
pnpm preview

# esegue il linting del codice
pnpm lint
```

## Routing

| Percorso           | Descrizione                          |
| ------------------- | ------------------------------------- |
| `/homepage`         | Home page                             |
| `/products`         | Catalogo prodotti                     |
| `/products/:slug`   | Dettaglio prodotto                    |
| `/cart`             | Carrello                              |
| `/wishlist`         | Lista desideri                        |
| `/checkout`         | Checkout (con calcolo IVA e pagamento simulato) |
| `/aboutUs`          | Chi siamo                             |

Tutte le rotte sono racchiuse nel layout `Structure`, avvolto dai provider `CategoriesProvider` e `AppProvider`.

## Deploy

Il progetto è configurato per il deploy su **Netlify** (regola di fallback SPA in `public/_redirects`).

## Contributi

Progetto sviluppato dal **Gruppo 2**:

- [Sara Luongo](https://github.com/Sara-Luongo)
- [Abdeslam ElFtouh](https://github.com/AbdeslamElFtouh)
- [Raffaele De Pasca](https://github.com/depasca-raffaele)
- [Antonino Bellia](https://github.com/BelliaNino)
- [Francesco Cassese](https://github.com/francesco-cassese)

## Licenza

Progetto didattico a uso privato, sviluppato nell'ambito di un project work Boolean.
