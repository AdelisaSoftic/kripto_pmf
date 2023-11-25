from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15
import pathlib

def generate_hash(file_path):
    """ Generise SHA-256 hash datog fajla """
    hash_obj = SHA256.new()
    with open(file_path, 'rb') as file:
        hash_obj.update(file.read())
    return hash_obj

def generate_rsa_keys():
    """ Generise par RSA kljuceva (javni i privatni)  """
    key = RSA.generate(2048)
    private_key = key.export_key()
    public_key = key.publickey().export_key()
    return private_key, public_key

def sign_document(file_path, private_key):
    """ Potpisivanje dokumenta koristeci privatni RSA kljuc """
    hash_obj = generate_hash(file_path)
    key = RSA.import_key(private_key)
    signature = pkcs1_15.new(key).sign(hash_obj)
    return signature

def verify_signature(file_path, public_key, signature):
    """ Provjeravamo potpis dokumenta koristeci javni RSA kljuc """
    hash_obj = generate_hash(file_path)
    key = RSA.import_key(public_key)
    try:
        pkcs1_15.new(key).verify(hash_obj, signature)
        return True  # The signature is valid.
    except (ValueError, TypeError):
        return False  # The signature is not valid.

# Primjer
privatni_kljuc, javni_kljuc = generate_rsa_keys()

file_path = 'primjer.txt'

# Potpisivanje dokumenta
potpis = sign_document(file_path, privatni_kljuc)

# Provjeriti validnost potpisa
je_li_potpis_validan = verify_signature(file_path, javni_kljuc, potpis)
print("Je li potpis validan", is_valid)
