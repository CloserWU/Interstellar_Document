package com.closer.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class FileUtil{
	public void getFile(String digits, String filename) {
		int digit = Integer.parseInt(digits) + 2;
		String file = "E:\\calcuPI\\gmp\\Chudnovsky-BSA-PI\\pi.txt";
		String user_file = "E:\\calcuPI\\gmp\\Chudnovsky-BSA-PI\\" + filename;
		// byte[] line = " | digit(s)\n".getBytes();
		// byte[] split = " | ".getBytes();
		// byte[] endLine = "\n".getBytes();
		BufferedReader in = null;
		BufferedWriter out = null;
		try {
			in = new BufferedReader(new FileReader(file));
			out = new BufferedWriter(new FileWriter(user_file));
			int len = 0;
			// int length = 0;
			// byte[] b = new byte[10];

			int read = in.read();
			out.write((char) read);
			read = in.read();
			out.write((char) read);
			out.write("    | digit(s)\n");
			digit -= 2;

			for (int i = 1; i <= digit; i++) {
				if ((len = in.read()) == -1) {
					break;
				}
				out.write((char) len);
				if (i % 10 == 0) {
					out.write("    | ");
					out.write(String.valueOf(i));
					out.write("\n");
				}

			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				try {
					out.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}
}

