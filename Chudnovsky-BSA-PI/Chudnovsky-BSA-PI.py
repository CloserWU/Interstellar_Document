################################################################
# Computing pi by Binary Splitting Algorithm with GMP library. #
################################################################


# 经测试 计算三千两百万为PI所需时间如下
# CPU                                         计算时间      文件流写入时间
# Intel(R) Core(TM) i7-4720HQ CPU @ 3.40GHz   363.33s      30.08s
# Intel(R) Core(TM) i7-7700 CPU @ 3.60GHz     343.81s      27.82s
# Intel(R) Xeon(R) Gold 6148 CPU @ 2.40GHz    278.65s      8.54s
import gmpy2
import numpy as np
import time

# 在gmpy2中，mpz高精度整形， mpfr为高精度浮点


# 首先封装PQT类，定义P、Q、T为mpz类型数据
class PQT:
    def __init__(self):
        self.P = gmpy2.mpz(0)
        self.Q = gmpy2.mpz(0)
        self.T = gmpy2.mpz(0)


# 定义Chudnovsky类
class Chudnovsky:
    # 初始化变量
    def __init__(self, digits):
        self.DIGITS = digits            # 要计算的位数
        self.A = gmpy2.mpz(13591409)    # 常数A，mpz
        self.B = gmpy2.mpz(545140134)   # 常数B，mpz
        self.C = gmpy2.mpz(640320)      # 常数C，mpz
        self.D = gmpy2.mpz(426880)      # 常数D，mpz
        self.E = gmpy2.mpz(10005)       # 常数E，mpz
        self.aa = gmpy2.mpz(53360)      # 常数a，用来计算DIGITS_PER_TERM
        self.aa *= 53360                # mpz类型与int类型加减乘后依然为mpz类型
        self.aa *= 53360
        self.aa = gmpy2.log(self.aa)    # 常数aa = log(53360^3)
        self.DIGITS_PER_TERM = self.aa / gmpy2.log(10)          # 常数DIGITS_PER_TERM，用来计算递归的次数
        self.C3_24 = gmpy2.mpz(self.C * self.C * self.C / 24)   # 常数C3_24(C^3/24)，mpz。C为mpz但是与int做除法后，会自动变为mpfr类型，所以需要强制类型转换为mpz
        self.N = int(self.DIGITS / self.DIGITS_PER_TERM)        # N,mpz。递归计算PQT时只用计算到int(DIGITS/DIGITS_PER_TERM)为止即可
        self.PREC = int(self.DIGITS * np.log2(10))              # 最后输出pi的精度。在gmpy2中，精度的单位是bit，所以十进制输出每一位需要乘log2(10)

    # 构建一棵二叉树，递归遍历每个节点，复杂度为O(n)。
    # 目的是得到P(0,N)、Q(0,N)、T(0,N)，用于直接求得pi
    # P、Q、T定义见PDF
    # p_k = (2*k - 1)(6*k - 1)(6*k - 1)
    # q_k = (k^3) * (C^3) / 24
    # a_k = (-1)^k * (A + B*k)
    def compPQT(self, n1, n2):
        pqt = PQT()                                     # PQT对象
        if n1 + 1 == n2:                                # 递归的出口
            pqt.P  = 2 * n2 - 1                         # P(n2-1, n2) = a_n2
            pqt.P *= 6 * n2 - 1
            pqt.P *= 6 * n2 - 5
            pqt.Q  = self.C3_24 * n2 * n2 * n2          # Q(n2-1, n2) = q_n2
            pqt.T  = (self.A + self.B * n2) * pqt.P     # T(n2-1, n2) = a_n2 * p_n2
            if (n2 & 1) == 1:                           # (-1)^n2
                pqt.T = - pqt.T
        else:
            m = int((n1 + n2) / 2)                      ###########
            pqt1 = self.compPQT(n1, m)                  ## 二叉树 ##
            pqt2 = self.compPQT(m, n2)                  ###########
            pqt.P = pqt1.P * pqt2.P                     # P(n1, n2) = P(n1, m) * P(m, n2)
            pqt.Q = pqt1.Q * pqt2.Q                     # Q(n1, n2) = Q(n1, m) * Q(m, n2)
            pqt.T = pqt1.T * pqt2.Q + pqt1.P * pqt2.T   # T(n1, n2) = T(n1, m) * Q(m, n2) + P(n1, m) * T(m, n2)
        return pqt


    ################################################
    #                _____           Q(0, N)       #
    # pi = 426880 · √10005  · ———————————————————  #
    #                         A·Q(0, N) + T(0, N)  #
    ################################################
    def compPi(self):
        print("**** PI Computation ( " + str(self.DIGITS) + " digits )")
        t0 = time.time()
        pqt = self.compPQT(0, self.N)                           # 计算(0, N)的PQT
        gmpy2.get_context().precision = self.PREC               # 设置mpfr的精度为PREC
        pi = self.D * gmpy2.sqrt(gmpy2.mpfr(self.E)) * pqt.Q    # 计算pi的分子
        pi /= (self.A * pqt.Q + pqt.T)                          # 除以分母得到pi
        t1 = time.time()
        print('TIME (COMPUTE):' + str(t1-t0))
        file = open('pi.txt', 'w')                              # 将pi写入文件保存
        file.write(str(pi))
        t2 = time.time()
        print('TIME (WRITE):' + str(t2-t1))
    #     return pi


digit = int(input('Input digits:'))
main = Chudnovsky(digit)
main.compPi()
