export {};

// Create a type for the roles
// declare enum Roles {
//   Seller = "seller",
//   Buyer = "buyer",
//   notDefined = "notDefined"
// }

// export {Roles};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    };
  }
}