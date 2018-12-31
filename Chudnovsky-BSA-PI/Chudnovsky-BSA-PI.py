import gmpy2
import numpy as np
import time

class PQT:
    def __init__(self):
        self.P = gmpy2.mpz(0)
        self.Q = gmpy2.mpz(0)
        self.T = gmpy2.mpz(0)


class Chudnovsky:
    def __init__(self, digits):
        self.DIGITS = digits
        self.A = gmpy2.mpz(13591409)
        self.B = gmpy2.mpz(545140134)
        self.C = gmpy2.mpz(640320)
        self.D = gmpy2.mpz(426880)
        self.E = gmpy2.mpz(10005)
        self.aa = gmpy2.mpz(53360)
        self.aa *= 53360
        self.aa *= 53360
        self.aa = gmpy2.log(self.aa)
        self. DIGITS_PER_TERM = self.aa / gmpy2.log(10)
        self.C3_24 = gmpy2.mpz(self.C * self.C * self.C / 24)
        self.N = int(self.DIGITS / self.DIGITS_PER_TERM)
        self.PREC = int(self.DIGITS * np.log2(10))

    def compPQT(self, n1, n2):
        pqt = PQT()
        if n1 + 1 == n2:
            pqt.P  = 2 * n2 - 1
            pqt.P *= 6 * n2 - 1
            pqt.P *= 6 * n2 - 5
            pqt.Q  = self.C3_24 * n2 * n2 * n2
            pqt.T  = (self.A + self.B * n2) * pqt.P
            if (n2 & 1) == 1:
                pqt.T = - pqt.T
        else:
            m = int((n1 + n2) / 2)
            pqt1 = self.compPQT(n1, m)
            pqt2 = self.compPQT(m, n2)
            pqt.P = pqt1.P * pqt2.P
            pqt.Q = pqt1.Q * pqt2.Q
            pqt.T = pqt1.T * pqt2.Q + pqt1.P * pqt2.T
        return pqt

    def compPi(self):
        print("**** PI Computation ( " + str(self.DIGITS) + " digits )")
        t0 = time.time()
        pqt = self.compPQT(0, self.N)
        gmpy2.get_context().precision=self.PREC
        pi = self.D * gmpy2.sqrt(gmpy2.mpfr(self.E)) * pqt.Q
        pi /= (self.A * pqt.Q + pqt.T)
        t1 = time.time()
        print('TIME (COMPUTE):' + str(t1-t0))
        file = open('pi.txt', 'w')
        file.write(str(pi))
        t2 = time.time()
        print('TIME (WRITE):' + str(t2-t1))
    #     return pi


digit = int(input('Input digits:'))
main = Chudnovsky(digit)
main.compPi()
